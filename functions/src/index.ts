require("dotenv").config();

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import auth from "./middleware/auth";
import { createUser } from "./user/create-user";
import createVerification from "./verification/create-verification";
import verifyUser from "./verification/verify-user";
import resendOTP from "./verification/resend-otp";
import deleteVerification from "./verification/delete-verification";
import createJob from "./job/create-job";
import createJobProfile from "./job-profile/create-job-profile";
import findUser from "./user/find-user";
import getDashboardData from "./dashboard/get-dashboard-data";
import updateUser from "./user/update-user";
import createJobOffer from "./offer/create-job-offer";
import createJobProfileOffer from "./offer/create-job-profile-offer";
// import getRooms from "./chats/get-rooms";
import generateResources from "./learn/generate-resources";
import updateJob from "./job/update-job";
import deleteJob from "./job/delete-job";
import updateJobProfile from "./job-profile/update-job-profile";
import deleteJobProfile from "./job-profile/delete-job-profile";
import { getFirebaseApp } from "./firebase";
import { getFirestore } from "firebase-admin/firestore";
import createExchange from "./exchange/create-exchange";

const firebaseApp = getFirebaseApp();
const firestore = getFirestore(firebaseApp);
firestore
  .collection("rooms")
  .add({
    foo: "bar",
  })
  .then(console.log)
  .catch(console.error);

const expressInstance = express();
expressInstance.use(express.json());
expressInstance.use(cors({ origin: true }));

// ROUTE: /users
expressInstance
  // UNAUTHENTICATED ENDPOINTS
  .put("/user", createUser)
  // Authenticated ENDPOINTS:
  .get("/user", auth, findUser)
  .patch("/user", auth, updateUser);

// ROUTE: /verification
expressInstance
  .put("/verification", createVerification)
  .post("/verification", verifyUser)
  .post("/verification/retry", resendOTP)
  .delete("/verification", deleteVerification);

// ROUTE: /job
expressInstance.put("/job", auth, createJob).patch("/job", auth, updateJob).delete("/job", auth, deleteJob);

// ROUTE: /job-profile
expressInstance
  .put("/job-profile", auth, createJobProfile)
  .patch("/job-profile", auth, updateJobProfile)
  .delete("/job-profile", auth, deleteJobProfile);

// ROUTE: /dashboard
expressInstance.get("/dashboard", auth, getDashboardData);

// ROUTE: /offer
expressInstance.put("/offer/jobOffer", auth, createJobOffer).put("/offer/jobProfileOffer", auth, createJobProfileOffer);

// ROUTE: /exchange
expressInstance.put("/exchange", auth, createExchange);

// expressInstance.get("/chats/rooms", auth, getRooms);

expressInstance.get("/generate-resources", generateResources);

export const app = functions.https.onRequest(expressInstance);
