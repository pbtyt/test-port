import { ACTIVES } from '../constants/active.constants';

class WebSocketManager {
	private static instance: WebSocketManager;
	private ws: WebSocket | null = null;
	private dataSubscribers: Array<(data: any) => void> = [];
	private statusSubscribers: Array<(connected: boolean) => void> = [];
	private activeSubscriptions = 0;
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 5;
	private reconnectInterval = 5000;
	private isReconnecting = false;
	private reconnectTimer: NodeJS.Timeout | null = null;

	public static getInstance() {
		if (!WebSocketManager.instance) {
			WebSocketManager.instance = new WebSocketManager();
		}
		return WebSocketManager.instance;
	}

	private connect() {
		if (this.ws) return;

		this.clearReconnectTimer();
		this.isReconnecting = false;
		this.ws = new WebSocket(
			`wss://stream.binance.com:9443/stream?streams=${ACTIVES.join('/')}`
		);

		this.ws.onopen = () => {
			this.reconnectAttempts = 0;
			this.statusSubscribers.forEach(cb => cb(true));

			console.log('WB Connect');
		};

		this.ws.onmessage = event => {
			try {
				const { data } = JSON.parse(event.data);
				this.dataSubscribers.forEach(cb => cb(data));
			} catch (err) {
				console.error('Error parsing data:', err);
			}
		};

		this.ws.onerror = error => {
			console.error('WebSocket error:', error);
			this.handleDisconnect();
		};

		this.ws.onclose = () => {
			this.handleDisconnect();
		};
	}

	private handleDisconnect() {
		this.ws = null;
		this.statusSubscribers.forEach(cb => cb(false));

		if (this.activeSubscriptions > 0 && !this.isReconnecting) {
			this.scheduleReconnect();
		}
	}

	private scheduleReconnect() {
		if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			console.error('Max reconnect attempts reached');
			return;
		}

		this.isReconnecting = true;
		this.reconnectAttempts++;

		this.reconnectTimer = setTimeout(() => {
			console.warn(`Reconnecting attempt ${this.reconnectAttempts}`);
			this.connect();
		}, this.reconnectInterval);
	}

	private clearReconnectTimer() {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
	}

	public subscribeToData(callback: (data: any) => void) {
		this.dataSubscribers.push(callback);
		this.activeSubscriptions++;
		if (this.activeSubscriptions === 1) this.connect();
	}

	public unsubscribeFromData(callback: (data: any) => void) {
		this.dataSubscribers = this.dataSubscribers.filter(cb => cb !== callback);
		this.activeSubscriptions--;
		if (this.activeSubscriptions === 0 && this.ws) {
			this.ws.close();
			this.ws = null;
		}
	}

	public subscribeToStatus(callback: (connected: boolean) => void) {
		this.statusSubscribers.push(callback);
		if (this.ws) callback(this.ws.readyState === WebSocket.OPEN);
	}

	public unsubscribeFromStatus(callback: (connected: boolean) => void) {
		this.statusSubscribers = this.statusSubscribers.filter(
			cb => cb !== callback
		);
	}
}

export const wsManager = WebSocketManager.getInstance();
