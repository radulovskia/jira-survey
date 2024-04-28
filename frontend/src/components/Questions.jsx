import Question from "./Question.jsx";
import Header from "./Header/Header.jsx";
import { CORE_QUESTIONS } from "../data.js";

export default function Questons() {
    return (
        <>
            <Header />
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