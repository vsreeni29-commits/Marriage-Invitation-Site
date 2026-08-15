export type Blessing = {
  id: string;
  message: string;
  createdAt: string;
};

export type RSVPResponse = {
  id: string;
  attending: boolean;
  name: string;
  guestCount: number;
  note?: string;
  createdAt: string;
};

export interface BlessingService {
  list(): Promise<Blessing[]>;
  submit(message: string): Promise<Blessing>;
}

export interface RSVPService {
  submit(response: Omit<RSVPResponse, 'id' | 'createdAt'>): Promise<RSVPResponse>;
}
