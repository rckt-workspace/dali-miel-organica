export type Currency = "COP" | "USD";

export type PaymentStatus = "PENDING" | "APPROVED" | "DECLINED" | "VOIDED" | "ERROR";

export interface CreatePaymentRequest {
  orderId: string;
  amountInCents: number;
  currency: Currency;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  description?: string;
  redirectUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface CreatePaymentResponse {
  paymentId: string;
  status: PaymentStatus;
  paymentUrl?: string;
  redirectUrl?: string;
  raw?: unknown;
}

export interface PaymentStatusResponse {
  paymentId: string;
  orderId: string;
  status: PaymentStatus;
  amountInCents: number;
  currency: Currency;
  createdAt: Date;
  finalizedAt?: Date;
  raw?: unknown;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  eventType?: string;
  paymentId?: string;
  orderId?: string;
  status?: PaymentStatus;
  amountInCents?: number;
  raw?: unknown;
}

export interface RefundPaymentRequest {
  paymentId: string;
  amountInCents?: number;
  reason?: string;
}

export interface RefundResponse {
  refundId: string;
  paymentId: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  amountInCents: number;
  raw?: unknown;
}
