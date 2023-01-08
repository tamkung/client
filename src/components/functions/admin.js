import axios from "axios";

export const adminListUser = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/admin-list-user", {
      headers: {
         authtoken,
      },
   });
};

export const adminEnableAndDisenableMember = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/admin-enable-and-disenable-member", value, {
      headers: {
         authtoken,
      },
   });
};

export const adminReadLevel = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/admin-read-level", value, {
      headers: {
         authtoken,
      },
   });
};

export const adminUpdateLevel = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/admin-update-level", value, {
      headers: {
         authtoken,
      },
   });
};

export const adminAddQuestionType = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/admin-add-question-type", value, {
      headers: {
         authtoken,
      },
   });
};

export const adminReadQuestionType = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/admin-read-question-type", value, {
      headers: {
         authtoken,
      },
   });
};

export const adminUpdateQuestionType = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/admin-update-question-type", value, {
      headers: {
         authtoken,
      },
   });
};

export const adminDeleteQuestionType = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/admin-delete-question-type", value, {
      headers: {
         authtoken,
      },
   });
};
