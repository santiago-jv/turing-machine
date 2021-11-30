import words from "./words.json"
import STATE_1 from "../images/state_1.svg";
import ARROW_Q1_TO_Q2 from "../images/arrow_q1_to_q2.svg"
import STATE_2 from "../images/state_2.svg";
import ARROW_Q2_TO_Q3 from "../images/arrow_q2_to_q3.svg"
import ARROW1_RETURN_Q1 from "../images/arrow1_return_q1.svg"
import STATE_3 from "../images/state_3.svg";
import ARROW2_RETURN_Q1 from "../images/arrow2_return_q1.svg"
import ARROW_RETURN_Q2 from "../images/arrow_return_q2.svg"
import FRENCH from "../images/french.svg"
import SPANISH from "../images/spanish.svg"
import ENGLISH from "../images/english.svg"

const elementsProperties = [

    {
        id: "q1",
        image: STATE_1
    },
    {
        id: "arrow1_return_q1",
        image: ARROW1_RETURN_Q1
    },
    {
        id: "arrow2_return_q1",
        image: ARROW2_RETURN_Q1
    },

    {
        id: "arrow_q1_to_q2",
        image: ARROW_Q1_TO_Q2
    },

    {
        id: "q2",
        image: STATE_2
    },
    {
        id: "arrow_return_q2",
        image: ARROW_RETURN_Q2
    },
    {
        id: "arrow_q2_to_q3",
        image: ARROW_Q2_TO_Q3
    },


    {
        id: "q3",
        image: STATE_3
    },


];

const languages = [
    {
        name:"spanish",
        image:SPANISH
    },
    {
        name:"english",
        image:ENGLISH
    },
    {
        name:"french",
        image:FRENCH
    }
]
export {
    elementsProperties,
    words,
    languages
}