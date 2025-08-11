import { Button } from "@/components/ui/button";

interface EditingBannerProps {
  onCancel: () => void;
  onSave: (e: React.FormEvent) => void;
  disabled: boolean;
}

const EditingBanner: React.FC<EditingBannerProps> = ({
  onCancel,
  onSave,
  disabled
}) => {
  return (
    <div className="mb-4 p-3 bg-[#2f2f2f] rounded-lg flex justify-between items-center">
      <span className="text-gray-400">Editing message</span>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className="text-gray-300 hover:bg-[#404040]" 
          onClick={onCancel} 
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button 
          className="bg-[#4f46e5] hover:bg-[#4338ca]" 
          onClick={onSave} 
          disabled={disabled}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditingBanner;