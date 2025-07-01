import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'movie-ticket-booking',
  eventKey: process.env.INNGEST_EVENT_KEY!,
});
