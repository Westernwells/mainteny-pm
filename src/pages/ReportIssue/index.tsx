import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ElevatorView} from 'models/elevator';
import {useLogIssue} from 'hooks/reactQuery/useServiceOrder';
import {FlexContainer} from 'components/FlexContainer';
import {Stepper} from 'components/Stepper';
import {AddDescription} from './AddDescription';
import {AddInstructions} from './AddInstructions';
import {SelectUnit} from './SelectUnit';

const steps = ['Select unit', 'Add description', 'Add instructions'];

export const ReportIssue = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<ElevatorView>();
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const {mutate: logIssue, isLoading: isSubmitting} = useLogIssue();

  useEffect(() => {
    if (
      (activeStep === 0 && !selectedUnit) ||
      (activeStep === 1 && !description) ||
      (activeStep === 2 && !instructions)
    ) {
      return setDisableNextBtn(true);
    }

    return setDisableNextBtn(false);
  }, [activeStep, selectedUnit, description, instructions]);

  const logNewIssue = () => {
    logIssue(
      {
        elevatorId: selectedUnit?.id,
        description,
        moreInstruction: instructions,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      },
    );
  };

  return (
    <Stepper
      handleCancel={() => navigate(-1)}
      handleSubmit={() => logNewIssue()}
      stepperStyles={{maxWidth: '38rem', pb: '2.25rem'}}
      disableNextBtn={disableNextBtn || isSubmitting}
      submitting={isSubmitting}
      getActiveStep={(val) => setActiveStep(val)}
      steps={steps}
      containerStyles={{
        flexGrow: 1,
        ml: '0',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <FlexContainer
        containerStyle={{mt: '1em', overflowY: 'scroll', height: 0}}>
        {activeStep === 0 ? (
          <SelectUnit
            getSelectedUnit={(val) => setSelectedUnit(val)}
            initialSelectedUnit={selectedUnit}
          />
        ) : activeStep === 1 ? (
          <AddDescription
            description={description}
            setDescription={setDescription}
          />
        ) : activeStep === 2 ? (
          <AddInstructions
            instructions={instructions}
            setInstructions={setInstructions}
          />
        ) : null}
      </FlexContainer>
    </Stepper>
  );
};
