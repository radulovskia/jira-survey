import Result from "./Result.jsx";
import { CORE_QUESTIONS, CORE_RESULTS } from "../data.js";

export default function Questons() {
    return (
        <section id="core-concepts">
            {/* <h2>Questions</h2> */}
            <ol>
                {CORE_RESULTS.map((questionItem) => (<Result key={questionItem.title} {...questionItem} />))}
            </ol>
        </section>
    );
}



{/* {CORE_CONCEPTS.nap((conceptItem) => <CoreConcept title={CORE_CONCEPTS[0].title} description={CORE_CONCEPTS[0].description} image={CORE_CONCEPTS[0].image} /> )}
        { <CoreConcept {...CORE_CONCEPTS[1]}/>
        { <CoreConcept {...CORE_CONCEPTS[2]}/>}*/}          