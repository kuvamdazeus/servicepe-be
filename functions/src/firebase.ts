import * as admin from "firebase-admin";
import { App } from "firebase-admin/app";

let app: App;

export const getFirebaseApp = () => {
  if (!app) {
    app = admin.initializeApp();
  }

  return app;
};
