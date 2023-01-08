import axios from "axios";

export const loadQuestionType = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/query-question-type", {
      headers: {
         authtoken,
      },
   });
};

export const loadQuestionTypeFAQ = async () => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/query-question-type-faq", {});
};

export const loadAllQuestion = async (value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/query-all-qusetion", value, {});
};

export const loadQuestionTypeName = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/query-question-type-name", value, {
      headers: {
         authtoken,
      },
   });
};

export const loadLevel = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/query-Level", {
      headers: {
         authtoken,
      },
   });
};

export const countQuestionType = async (authtoken, value) => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/query-count-question-type", {
      headers: {
         authtoken,
      },
   });
};

export const countFAQType = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/query-count-faq-type", {
      headers: {
         authtoken,
      },
   });
};

export const readFAQType = async (value) => {
   //    console.log("Func", authtoken);
   return await axios.post(process.env.REACT_APP_API + "/query-read-faq-type", value, {});
};

export const countMember = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/query-count-member", {
      headers: {
         authtoken,
      },
   });
};

export const countQstNoAns = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.get(process.env.REACT_APP_API + "/query-count-question-no-ans", {
      headers: {
         authtoken,
      },
   });
};
