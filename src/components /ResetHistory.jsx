import { useNavigate } from "react-router-dom";
import usePodcastsStore from "../zustand/store";

const ResetHistory = () => {
    const resetListeningHistory = usePodcastsStore((state) => state.resetListeningHistory);
    const navigate = useNavigate();

    const handleReset = () => {
        resetListeningHistory();
        alert("Your listening history has been reset.");
        navigate("/");
    };

    return (
        <div>
            <h1>Reset Listening History</h1>
            <p>Are you sure you want to reset your entire listening history? This action cannot be undone.</p>
            <button onClick={handleReset}>Reset Listening History</button>
        </div>
    );
};

export default ResetHistory;