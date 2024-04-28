import Question from "./QuestionEditable.jsx";
import { CORE_QUESTIONS } from "../data.js";
import HeaderEditable from "./Header/HeaderEditable.jsx";
import NewQuestionModal from "./NewQuestionModal.jsx";

export default function Questons() {
    return (
        <>

            <HeaderEditable />
            <section id="core-concepts">
                <ol>
                    {CORE_QUESTIONS.map((questionItem) => (<><Question key={questionItem.title} {...questionItem} /> <hr /></>))}
                </ol>

            </section>

        </>

    );
}



{/* {CORE_CONCEPTS.nap((conceptItem) => <CoreConcept title={CORE_CONCEPTS[0].title} description={CORE_CONCEPTS[0].description} image={CORE_CONCEPTS[0].image} /> )}
        { <CoreConcept {...CORE_CONCEPTS[1]}/>
        { <CoreConcept {...CORE_CONCEPTS[2]}/>}*/}          