import { PubSubService } from "./types";

export class TestPubSub implements PubSubService {
  publish(topicId: string, payload: Record<string, unknown>): Promise<string> {
    console.log(payload);
    return Promise.resolve(`Published to ${topicId} successfully!`);
  }

  validatePayload(payload: Record<string, any>): boolean {
    return !!payload;
  }
}
