import type {
  CreatePaymentRequest,
  CreatePaymentResponse,
  PaymentStatusResponse,
  RefundPaymentRequest,
  RefundResponse,
  WebhookVerificationResult,
} from "./types";

export interface PaymentProvider {
  readonly name: string;

  /**
   * Initializes a payment transaction with the external gateway.
   */
  createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse>;

  /**
   * Fetches the current authoritative status of a payment.
   */
  getPaymentStatus(paymentId: string): Promise<PaymentStatusResponse>;

  /**
   * Validates integrity and authenticity of an inbound payment webhook notification.
   */
  verifyWebhook(
    payload: unknown,
    signature: string,
    secret?: string,
  ): Promise<WebhookVerificationResult>;

  /**
   * Initiates a refund for a previously processed transaction.
   */
  refundPayment(request: RefundPaymentRequest): Promise<RefundResponse>;
}
