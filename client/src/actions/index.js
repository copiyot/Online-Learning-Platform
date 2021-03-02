import Axios from "axios";

import {
  FETCH_SCHEME_WORK_ITEMS,
  CREATE_LESSON,
  FETCH_LESSONS,
  START_LESSON,
  FETCH_SCHEME_WORK,
  FETCH_SUBJECTS,
  CREATE_SCHEME_OF_WORK,
  FETCH_TOPIC,
  CREATE_TOPIC,
  FETCH_SUBTOPIC,
  CREATE_SUBTOPIC,
  FETCH_ASSIGNMENT,
  FETCH_ASSESSMENT,
  FETCH_STUDENT_ASSESSMENT,
  FETCH_STUDENT_ASSIGNMENT,
  FETCH_STUDENT_LESSONS,
  FETCH_TEACHER_SELECTED_SUBJECTS,
  IS_SIGNED_IN,
} from "./types";
import { BASE_URL } from "../components/api";

export const setIsSignedIn = (isSignedIn) => {
  return {
    type: IS_SIGNED_IN,
    payload: isSignedIn,
  };
};

export const createLesson = (formValues) => async (dispatch) => {
  let res;
  try {
    const response = await Axios.post(BASE_URL + "lesson/create", formValues);
    res = response.data;
    if (res) {
      alert(res.message);
    }
  } catch (e) {
    console.log("Error encountered:" + e);
    alert("Failed to create lesson!");
  }

  dispatch({ type: CREATE_LESSON, payload: res.message });
};

export const createSubject = (formValues) => async () => {
  let response;

  try {
    response = await Axios.post(
      BASE_URL + "curriculum/subject/add",
      formValues
    );

    alert(response.data.message);
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Ooops Something went wrong!!");
  }
};

export const editSubject = (formValues) => async () => {
  let response;

  try {
    response = await Axios.put(
      BASE_URL + "curriculum/subject/update",
      formValues,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    alert(response.data.message);
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Ooops Something went wrong!!");
  }
};

export const deleteSubject = (id) => async () => {
  let response;

  try {
    response = await Axios.delete(
      BASE_URL + "curriculum/subject/delete/" + id,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    alert(response.data.message);
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Ooops Something went wrong!!");
  }
};

export const fetchSubjects = () => async (dispatch) => {
  let response;

  try {
    response = await Axios.get(BASE_URL + "curriculum/subject/list");
    dispatch({ type: FETCH_SUBJECTS, payload: response.data });
  } catch (e) {
    console.log("Failed to fetch scheme" + e);
  }
};

export const updateSubjects = (formValues) => async (dispatch) => {
  dispatch({ type: FETCH_SUBJECTS, payload: formValues });
};

export const createSubjectByTeacher = (formValues) => async (dispatch) => {
  try {
    let response = await Axios.post(
      BASE_URL + "teacher/secured/save-subjects",
      formValues,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    alert(response.data.message);
  } catch (e) {
    console.log("Failed to create sujects by teacher" + e);
  }
};

export const fetchTopic = () => async (dispatch) => {
  let response;

  try {
    response = await Axios.get(
      BASE_URL +
        "curriculum/topic/searchByUsername/" +
        localStorage.getItem("username")
    );

    dispatch({ type: FETCH_TOPIC, payload: response.data });
  } catch (e) {
    console.log("Failed to fetch scheme" + e);
  }
};

export const editTopic = (formValues) => async () => {
  let response;

  try {
    response = await Axios.put(
      BASE_URL + "curriculum/topic/update",
      formValues,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    alert(response.data.message);
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Ooops Something went wrong!!");
  }
};

export const deleteTopic = (id) => async () => {
  let response;

  try {
    response = await Axios.delete(BASE_URL + "curriculum/topic/delete/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    alert(response.data.message);
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Ooops Something went wrong!!");
  }
};

export const fetchTeacherSelectedSubjects = () => async (dispatch) => {
  try {
    const response = await Axios.get(
      BASE_URL +
        "curriculum/teacher/subjects/" +
        localStorage.getItem("username")
    );

    dispatch({ type: FETCH_TEACHER_SELECTED_SUBJECTS, payload: response.data });
  } catch (e) {
    console.log("Ooops something went wrong", e);
  }
};

export const updateTopics = (formValues) => async (dispatch) => {
  dispatch({ type: FETCH_TOPIC, payload: formValues });
};

export const updateSubTopics = (formValues) => async (dispatch) => {
  dispatch({ type: FETCH_SUBTOPIC, payload: formValues });
};

export const createTopic = (formValues) => async (dispatch) => {
  let response;

  try {
    response = await Axios.post(BASE_URL + "curriculum/topic/add", formValues);
    dispatch({ type: CREATE_TOPIC, payload: response.data });
    alert(response.data.message);
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Oops something went wrong!!");
  }
};

export const createSubTopic = (formValues) => async (dispatch) => {
  let result;

  try {
    let res = await Axios.post(
      BASE_URL + "curriculum/subtopic/add",
      formValues,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    result = res.data;
    alert(result.message);

    dispatch({ type: CREATE_SUBTOPIC, payload: result.message });
  } catch (e) {
    console.log("Error saving sub topic:" + e);
    alert("Error saving sub topic");
  }
};

export const editSubTopic = (formValues) => async () => {
  let response;

  try {
    response = await Axios.put(
      BASE_URL + "curriculum/sub_topic/update",
      formValues,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    alert(response.data.message);
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Ooops Something went wrong!!");
  }
};

export const fetchSubTopic = () => async (dispatch) => {
  let response;

  try {
    response = await Axios.get(
      BASE_URL +
        "curriculum/subtopic/searchByUsername/" +
        localStorage.getItem("username")
    );
    console.log(response.data);
    dispatch({ type: FETCH_SUBTOPIC, payload: response.data });
  } catch (e) {
    console.log("Failed to fetch scheme" + e);
  }
};

export const deleteSubTopic = (id) => async () => {
  let response;

  try {
    response = await Axios.delete(
      BASE_URL + "curriculum/topic/sub_topic/delete/" + id,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    alert(response.data.message);
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Ooops Something went wrong!!");
  }
};

export const startLesson = (id) => async (dispatch) => {
  let data = { lesson_id: id };
  let responseJoin;

  try {
    const response = await Axios.post(BASE_URL + "lesson/start", data);
    let dataJoin = {
      lesson_id: id,
      lesson_password: response.data.moderator_pass,
      username: localStorage.getItem("username"),
    };
    responseJoin = await Axios.post(BASE_URL + "lesson/join", dataJoin);
    console.log(responseJoin.data);
    let lesson_url = responseJoin.data.lesson_url;
    if (lesson_url) {
      window.open(lesson_url);
    }
  } catch (e) {
    console.log("Error when starting lesson " + e);
    alert("Error starting your lesson");
  }

  dispatch({ type: START_LESSON, payload: responseJoin.data });
};

export const startStudentLesson = (id) => async (dispatch) => {
  let data = { lesson_id: id };
  let responseJoin;

  try {
    const response = await Axios.post(BASE_URL + "lesson/start", data);
    console.log(response);
    let dataJoin = {
      lesson_id: id,
      lesson_password: response.data.attendee_pass,
      username: localStorage.getItem("username"),
    };
    responseJoin = await Axios.post(BASE_URL + "lesson/join", dataJoin);
    console.log(responseJoin.data);
    let lesson_url = responseJoin.data.lesson_url;
    if (lesson_url) {
      window.open(lesson_url);
    }
    alert(response.data.message);
  } catch (e) {
    console.log("Error when starting lesson " + e);
    alert("Error starting your lesson");
  }

  dispatch({ type: START_LESSON, payload: responseJoin.data });
};

export const fetchLessons = () => async (dispatch) => {
  let response;
  try {
    response = await Axios.get(
      BASE_URL + "lesson/list/" + localStorage.getItem("username")
    );
    dispatch({ type: FETCH_LESSONS, payload: response.data });
    response = await Axios.get(
      BASE_URL + "lesson/list/" + localStorage.getItem("username")
    );
  } catch (e) {
    console.log("Failed to fetch scheme" + e);
  }
};

export const fetchSchemeOfWork = () => async (dispatch) => {
  let response;

  try {
    response = await Axios.get(
      BASE_URL +
        "curriculum/scheme_of_work/list/" +
        localStorage.getItem("username")
    );
    dispatch({ type: FETCH_SCHEME_WORK, payload: response.data });
  } catch (e) {
    console.log("Failed to fetch scheme" + e);
  }
};

export const createSchemeOfWork = (formValues) => async (dispatch) => {
  let response;

  try {
    response = await Axios.post(
      BASE_URL + "curriculum/scheme_of_work/add",
      formValues
    );

    console.log(formValues);
    let res = response.data;
    alert(res.message);
    dispatch({ type: CREATE_SCHEME_OF_WORK, payload: response.data });
  } catch (e) {
    console.log("Error encountered" + e);
    alert("Something went wrong");
  }
};

export const createSchemeOfWorkItem = (formValues) => async (dispatch) => {
  try {
    console.log(formValues);
    const response = await Axios.post(
      BASE_URL + "curriculum/scheme_of_work_item/add",
      formValues
    );
    let res = response.data;
    if (res) {
      alert(res.message);
    } else {
      alert("Failed to save scheme of work item!");
    }
  } catch (e) {
    console.log("Error encountered:" + e);
  }
};

export const fetchWorkItems = () => async (dispatch) => {
  let result;
  try {
    const response = await Axios.get(
      BASE_URL +
        "curriculum/scheme_of_work_details/list/" +
        localStorage.getItem("username")
    );
    let schemeOWorks = response.data;
    console.log(response.data);
    result = [];
    for (var scheme of schemeOWorks) {
      let schemeItems = scheme.items;
      for (var item of schemeItems) {
        let data = item;
        data["subject"] = scheme.subject;
        data["term"] = scheme.term;
        data["id"] = scheme.id;
        data["subject_id"] = scheme.subject_id;
        result.push(data);
      }
    }
  } catch (e) {
    console.log("Failed to fetch scheme" + e);
  }

  dispatch({ type: FETCH_SCHEME_WORK_ITEMS, payload: result });
};

export const createAssignmentForm = (formValues) => async (dispatch) => {
  try {
    const response = await Axios.post(
      BASE_URL + "secured/assessment/saveAssessment",
      formValues
    );

    console.log(response);
    alert(response.data.message);
  } catch (e) {
    console.log("Failed to create assignment" + e);
    alert("Something went wrong");
  }
};

export const createAssignmentFile = (formValues) => async () => {
  try {
    const response = await Axios.post(
      BASE_URL + "secured/assessment/saveAssessmentByAttachment",
      formValues,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    alert(response.data.message);
  } catch (e) {
    console.log("Failed to create assignment" + e);
    alert("Something went wrong");
  }
};

export const fetchAssignments = () => async (dispatch) => {
  try {
    const response = await Axios.get(
      BASE_URL +
        `secured/assessment/findAssessmentByTeacherId/${localStorage.getItem(
          "teacherId"
        )}/1`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    dispatch({ type: FETCH_ASSIGNMENT, payload: response.data });
  } catch (e) {
    console.log("Failed to create assignment" + e);
  }
};

export const fetchAssessments = () => async (dispatch) => {
  try {
    const response = await Axios.get(
      BASE_URL +
        `secured/assessment/findAssessmentByTeacherId/${localStorage.getItem(
          "teacherId"
        )}/2`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    dispatch({ type: FETCH_ASSESSMENT, payload: response.data });
  } catch (e) {
    console.log("Failed to create assignment" + e);
  }
};

export const fetchStudentAssessments = () => async (dispatch) => {
  try {
    const response = await Axios.get(
      BASE_URL +
        `secured/assessment/student-assessments/${localStorage.getItem(
          "username"
        )}/2`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    dispatch({ type: FETCH_STUDENT_ASSESSMENT, payload: response.data });
  } catch (e) {
    console.log("Failed to create assignment" + e);
  }
};

export const fetchStudentAssignments = () => async (dispatch) => {
  try {
    const response = await Axios.get(
      BASE_URL +
        `secured/assessment/student-assessments/${localStorage.getItem(
          "username"
        )}/1`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: FETCH_STUDENT_ASSIGNMENT, payload: response.data });
  } catch (e) {
    console.log("Failed to create assignment" + e);
  }
};

export const fetchStudentLessons = () => async (dispatch) => {
  try {
    const response = await Axios.get(
      BASE_URL + `lesson/list/${localStorage.getItem("username")}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    dispatch({ type: FETCH_STUDENT_LESSONS, payload: response.data });
    console.log(response.data);
  } catch (e) {
    console.log("Failed to create assignment" + e);
  }
};
