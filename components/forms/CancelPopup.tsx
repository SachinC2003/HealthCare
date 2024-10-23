import { Button } from '../ui/button';
// Define or import the Appointment type
export type Appointment = {
    id: number;
    doctor: {
      name: string;
    };
    hospital: {
      name: string;
    };
    schedule: Date | null;
    status: string;
    user: {
      name: string;
      phone: string
    };
  };
  
export const CancelePopup = ({ appointment, onClose, onConfirm }: { appointment: Appointment, onClose: () => void, onConfirm: (appointment: Appointment) => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
  <div className="bg-white text-black p-6 rounded-md shadow-lg max-w-sm mx-auto text-center">
    <h2 className="text-xl font-bold mb-4">Are you sure you want to cancel this appointment?</h2>
    <p className="mb-4">{`Patient: ${appointment.user.name}`}</p>
    <div className="flex justify-center space-x-4">
      <Button className='bg-red-700 border-black' variant="destructive" onClick={() => onConfirm(appointment)}>Confirm</Button>
      <Button className='bg-yellow-500 border-black' variant="secondary" onClick={onClose}>Cancel</Button>
    </div>
  </div>
</div>
  );
};
