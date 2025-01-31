import Signup from "./components/Signup"
import UsersList from "./components/UsersList"

function App() {

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <UsersList />
            <Signup />
        </div>
    )
}

export default App
