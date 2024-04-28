
import Header from "./components/Header/Header.jsx";

// import Examples from './components/Examples.jsx';
import EditQuestions from "./components/EditQuestions.jsx";
import Questions from './components/Questions.jsx'
import Results from './components/Results.jsx'
function App() {
  return (
    <div>
      <Header />
      <main>
        <Questions />
        <Results />
        <EditQuestions />
        {/* <Examples /> */}
      </main>
    </div>
  );
}
export default App;