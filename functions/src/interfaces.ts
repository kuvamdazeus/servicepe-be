import { User } from "@prisma/client";

export interface FirebaseMessageMetadata {
  type: "jobProfileOffer" | "jobOffer" | "image";
  data: any; //this HAS TO BE: JobOffer | JobProfileOffer ( should also contain user's data { name, image } )
}

export interface FirebaseMessage {
  sender: User;
  message: string;
  metadata: FirebaseMessageMetadata | null;
  created_at: number;
}
