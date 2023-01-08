import axios from "axios";

export const officerReadQuestionType = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-read-question-type", value, {
      headers: {
         authtoken,
      },
   });
};

export const officerReadQuestion = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-read-question", value, {
      headers: {
         authtoken,
      },
   });
};

export const replyQuestion = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-reply-question", value, {
      headers: {
         authtoken,
      },
   });
};

export const addFAQ = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-add-faq", value, {
      headers: {
         authtoken,
      },
   });
};

export const officerReadFAQType = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-read-FAQ-type", value, {
      headers: {
         authtoken,
      },
   });
};

export const officerReadFAQ = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-read-FAQ", value, {
      headers: {
         authtoken,
      },
   });
};

export const officerUpdateFAQ = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-update-FAQ", value, {
      headers: {
         authtoken,
      },
   });
};

export const deleteFAQ = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-delete-FAQ", value, {
      headers: {
         authtoken,
      },
   });
};

export const officerCountReply = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/officer-count-reply", value, {
      headers: {
         authtoken,
      },
   });
};
export const officerCountQuestionTypeAll = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/query-count-qusetion-type-all", {
      headers: {
         authtoken,
      },
   });
};
