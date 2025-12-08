import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div id="container">
      <h2>Hai112</h2>
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
