import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';

function App() {
  return (
    <div className="app flex">
      {/*Sidebar*/}
      <div className="basis-1/5 h-screen">
        <Sidebar />
      </div>

      {/*Feed*/}
      <div className="basis-3/5 h-screen">
        <Feed />
      </div>

      {/*Widgets*/}
      <div className="basis-1/5 h-screen">
        <Widgets />
      </div>
    </div>
  );
}

export default App;
