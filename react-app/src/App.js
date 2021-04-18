import Routes from './Routes.jsx';
import Header from './Header';

function App() {

  return (
    <main className="App row">
        <Header />
        <div className="page-body">
            <Routes />
        </div>
    </main>
  );
}

export default App;
