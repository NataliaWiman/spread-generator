interface SaveLoadPanelProps {
  onSave: () => void;
  onLoad: () => void;
}

const SaveLoadPanel = ({ onSave, onLoad }: SaveLoadPanelProps) => {
  return (
    <div className="p-4">
      <button
        onClick={onSave}
        className="bg-green-500 text-white p-2 rounded mr-2"
      >
        Save
      </button>
      <button onClick={onLoad} className="bg-red-500 text-white p-2 rounded">
        Load
      </button>
    </div>
  );
};

export default SaveLoadPanel;
