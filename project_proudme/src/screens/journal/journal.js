import React, { useState } from 'react';
import '../../css/journal.css';

import Button from '@material-ui/core/Button';
import Modal from '@mui/material/Modal';
import { FormGroup, Switch, FormControlLabel } from '@mui/material';

import { FaQuestionCircle } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const JournalScreen = () => {

    const [open, setOpen] = useState(false);
    const [defineOpen, setDefineOpen] = useState(false);
    const [progressError, setProgressError] = useState(false);
    const [booleanSelected, setBooleanSelected] = useState(false);
    const [numberSelected, setNumberSelected] = useState(false);
    const [timerSelected, setTimerSelected] = useState(false);
    
    const [goal, setGoal] = useState('');
    const [numericalValue, setNumericalValue] = useState(0);
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [threshold, setThreshold] = useState('');
    const [goalIsComplete, setGoalIsComplete] = useState(false);

    var goalArray = [];

    const handleOpenGoalModal = () => {
        setOpen(true);
    };

    const handleCloseGoalModal = () => {
        setOpen(false);
    };

    const handleOpenDefineModal = () => {
        if (booleanSelected || numberSelected || timerSelected) {
            setDefineOpen(true);
            setProgressError(false);
            handleCloseGoalModal();
        }
        else {
            setDefineOpen(false);
            setProgressError(true);
        }
    };

    const handleCloseDefineModal = () => {
        setDefineOpen(false);
    };

    const handleGoalChange = (e) => {
        setGoal(e.target.value);
    };

    const handleNumericalChange = (e) => {
        e.persist();
        setNumericalValue(+e.target.value);
    };

    const handleThresholdChange = (e) => {
        setThreshold(e.target.value);
    }

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleGoalIsCompleteChange = () => {
        setGoalIsComplete(!goalIsComplete);
    };

    function addGoal() {
        var count = 0;
        count++;
        for (var i = 0; i < count; i++) {
            goalArray.push(<div>{i}</div>);
        }
        console.log(goalArray);
    };

    function renderNumericGoal() {
        return (
        <div className="current-goal">
            <div className="goal-container">

                    <div className="goal-description">
                        <h3 className="goal-text">{goal}</h3>
                        <h6 className="goal-text">{description}</h6>
                    </div>

                    <div className="selection-container">

                        <IoIosArrowUp id="upIcon" onClick={() => setNumericalValue(numericalValue + 1) } />
                        <h2 className="number-text">{numericalValue}</h2>
                        <IoIosArrowDown id="downIcon" onClick={() => setNumericalValue(numericalValue - 1)} />
                    </div>

                </div>
            <div className="reflect-wrapper">
                <img className="reflect-image" src={require('../../components/images/journal/reflect.png')} alt="Icon to reflect on selected goal" />
                <p style={{fontWeight: 'bold'}}>Reflect</p>
            </div>
        </div>
        );
    }

    const createGoalModal = () => {
        return (
            <Modal
                aria-labelledby="goal-modal"
                aria-describedby="modal-to-create-new-goal"
                open={open}
                onClose={handleCloseGoalModal}
            >
                <div className="modal">
                    <h2>Creating a New Goal</h2>
                    <h4>Goal Name</h4>
                    <input className="modal-input" type="text" name="goal" onChange={handleGoalChange} value={goal}/>
                    <h4 className="progress-title">Keep track of your progress with a:</h4>

                    <div className="radio-group">
                        {booleanSelected ?
                        <Button style={{backgroundColor: '#AB87FF', marginTop: '4%', borderRadius: '20px', width: '90%', height: '60px',
                        textTransform: 'none', fontWeight: 'bold', fontSize: '18px', color: 'white'}}
                        onClick={() => { setBooleanSelected(false); setProgressError(true); }}
                        >Yes or No</Button> 
                        :
                        <Button style={{backgroundColor: '#ECECEC', marginTop: '4%', borderRadius: '20px', width: '90%', height: '60px',
                        textTransform: 'none', fontWeight: 'bold', fontSize: '18px'}}
                        onClick={() => { setBooleanSelected(true); setNumberSelected(false); setTimerSelected(false); setProgressError(false); }}
                        >Yes or No</Button>
                        }

                        <FaQuestionCircle className="tip-icon" size={28}/>
                    </div>

                    <div className="radio-group">
                        {numberSelected ?
                        <Button style={{backgroundColor: '#AB87FF', marginTop: '4%', borderRadius: '20px', width: '90%', height: '60px',
                        textTransform: 'none', fontWeight: 'bold', fontSize: '18px', color: 'white'}}
                        onClick={() => { setNumberSelected(false); setProgressError(true); }}
                        >Numeric Value</Button> 
                        :
                        <Button style={{backgroundColor: '#ECECEC', marginTop: '4%', borderRadius: '20px', width: '90%', height: '60px',
                        textTransform: 'none', fontWeight: 'bold', fontSize: '18px'}}
                        onClick={() => { setNumberSelected(true); setBooleanSelected(false); setTimerSelected(false); setProgressError(false); }}
                        >Numeric Value</Button>
                        }

                        <FaQuestionCircle className="tip-icon" size={28}/>
                    </div>

                    <div className="radio-group">
                        {timerSelected ?
                        <Button style={{backgroundColor: '#AB87FF', marginTop: '4%', borderRadius: '20px', width: '90%', height: '60px',
                        textTransform: 'none', fontWeight: 'bold', fontSize: '18px', color: 'white'}}
                        onClick={() => { setTimerSelected(false); setProgressError(true); }}
                        >Timer</Button> 
                        :
                        <Button style={{backgroundColor: '#ECECEC', marginTop: '4%', borderRadius: '20px', width: '90%', height: '60px',
                        textTransform: 'none', fontWeight: 'bold', fontSize: '18px'}}
                        onClick={() => { setTimerSelected(true); setBooleanSelected(false); setNumberSelected(false); setProgressError(false); }}
                        >Timer</Button>
                        }

                        <FaQuestionCircle className="tip-icon" size={28}/>
                    </div> 
                    
                    {progressError &&
                    <div className="progress-error">
                        <h4>Please select a progress tracking method before moving on!</h4>
                    </div>}

                    <div className="nav-options">
                        <Button style={{backgroundColor: '#D9D9D9', width: '45%', textTransform: 'none', fontWeight: 'bold', fontSize: '18px',
                        borderRadius: '20px'}}
                        onClick={() => { handleCloseGoalModal(); setBooleanSelected(false); setNumberSelected(false); setTimerSelected(false); }}
                        >
                            Cancel
                        </Button>

                        <Button style={{backgroundColor: '#ADF083', width: '45%', textTransform: 'none', fontWeight: 'bold', fontSize: '18px',
                        borderRadius: '20px'}}
                        onClick={() => { handleOpenDefineModal(); }}
                        >
                            Next Step
                        </Button>
                    </div>

                </div>
            </Modal>
        );
    };

    function defineGoalModal() {

        return (
            
            <Modal
                aria-labelledby="define-modal"
                aria-describedby="modal-to-define-new-goal"
                open={defineOpen}
                onClose={handleCloseDefineModal}
            >
                <div className="modal">
                {booleanSelected &&
                <div className="inside-modal">
                    <h2>Defining a New Goal</h2>
                    <h4>Goal Name</h4>
                    <input className="modal-input" type="text" name="goal" placeholder="Goal Name" onChange={handleGoalChange} value={goal}/>
                    <h2>Have you achieved your goal?</h2>
                    <FormGroup onChange={ () => {handleGoalIsCompleteChange(); console.log(goalIsComplete);} }
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '2%',
                    }}>
                        <FormControlLabel sx={{
                            color: 'black'
                        }}
                        control={<Switch color="secondary"/>} label="Goal complete?" />
                    </FormGroup>
                    <h5 className="example-text">Example: "Eat fruits / vegetables" At least 5 times a day.</h5>
                    <input className="modal-input" type="text" name="description" placeholder="Optional Description..." onChange={handleDescriptionChange} value={description}/>
                </div>
                }

                {numberSelected &&
                <div className="inside-modal">
                    <h2>Defining a New Goal</h2>
                    <h4>Goal Name</h4>
                    <input className="modal-input" type="text" name="goal" placeholder="Goal Name" onChange={handleGoalChange} value={goal}/>
                    <div className="goal-selection">
                        <select className="numerical-selection" id="numerical-selection" name="numerical-select" defaultValue={"at_least"} onChange={e => handleThresholdChange(e)}>
                            <option value={"at_least"}>At least</option>
                            <option value={"at_most"}>At most</option>
                            <option value={"equals"}>Equals</option>
                            <option value={"greater_than"}>Greater than</option>
                            <option value={"less_than"}>Less than</option>
                        </select>
                        <input className="numerical-selection" type="number" onChange={handleNumericalChange} placeholder="Quantity" value={numericalValue}/>
                    </div>
                    <input className="modal-half-input" type="text" name="goal-measurement" placeholder="Unit of measurement"
                    onChange={handleUnitChange} value={unit} />
                    <h5 className="example-text">Example: "Eat fruits / vegetables" At least 5 times a day.</h5>
                    <input className="modal-input" type="text" name="description" placeholder="Optional Description..." onChange={handleDescriptionChange} value={description}/>
                </div>
                }

                {timerSelected &&
                <div className="inside-modal">
                    <h2>Defining a New Goal</h2>
                    <h4>Goal Name</h4>
                    <input className="modal-input" type="text" name="goal" placeholder="Goal Name" onChange={handleGoalChange} value={goal}/>
                    <div className="goal-selection">
                        <select className="numerical-selection" id="numerical-selection" name="numerical-select" defaultValue={"at_least"} onChange={e => handleThresholdChange(e)}>
                            <option value={"at_least"}>At least</option>
                            <option value={"at_most"}>At most</option>
                            <option value={"equals"}>Equals</option>
                            <option value={"greater_than"}>Greater than</option>
                            <option value={"less_than"}>Less than</option>
                        </select>
                        <input className="numerical-selection" type="number" onChange={handleNumericalChange} placeholder="Quantity" value={numericalValue}/>
                    </div>
                    <input className="modal-half-input" type="text" name="goal-measurement" placeholder="Unit of measurement"
                    onChange={handleUnitChange} value={unit} />
                    <h5 className="example-text">Example: "Eat fruits / vegetables" At least 5 times a day.</h5>
                    <input className="modal-input" type="text" name="description" placeholder="Optional Description..." onChange={handleDescriptionChange} value={description}/>
                </div>
                }
                
                <div className="nav-options">
                        <Button style={{backgroundColor: '#D9D9D9', width: '45%', textTransform: 'none', fontWeight: 'bold', fontSize: '18px',
                        borderRadius: '20px'}}
                        onClick={() => { handleCloseDefineModal(); setBooleanSelected(false); setNumberSelected(false); setTimerSelected(false); setGoal(''); }}
                        >
                            Cancel
                        </Button>

                        <Button style={{backgroundColor: '#ADF083', width: '45%', textTransform: 'none', fontWeight: 'bold', fontSize: '18px',
                        borderRadius: '20px'}}
                        onClick={() => { handleCloseDefineModal(); renderNumericGoal(); addGoal(); }}
                        >
                            Create Goal
                        </Button>
                </div>

                </div>
                
            </Modal>
        );
    };

    return (
        <div className="journal">
            <h1 className="title">My Journal</h1>
            <div className="journalWrapper">
                <img className="journalCover" src={require('../../components/images/journal/journal_cover.png')}
                alt="Journal cover screen wrapper" />
                <div className="leftPageWrapper">
                        <div className="goal-box">
                            <h1 className="journal-title">My Goals</h1>
                            <div className="current-goal">
                                <div className="goal-container">

                                        <div className="goal-description">
                                            <h3 className="goal-text">{goal}</h3>
                                            <h6 className="goal-text">{description}</h6>
                                        </div>

                                        <div className="selection-container">

                                            <IoIosArrowUp id="upIcon" onClick={() => setNumericalValue(numericalValue + 1) } />
                                            <h2 className="number-text">{numericalValue}</h2>
                                            <IoIosArrowDown id="downIcon" onClick={() => setNumericalValue(numericalValue - 1)} />
                                        </div>

                                    </div>
                                <div className="reflect-wrapper">
                                    <img className="reflect-image" src={require('../../components/images/journal/reflect.png')} alt="Temporary reflection icon" />
                                    <p style={{fontWeight: 'bold'}}>Reflect</p>
                                </div>
                            </div>
                            <Button style={{marginTop: '5%', backgroundColor: '#ADF083', borderRadius: '20px', width: '70%',
                            height: '60px', textTransform: 'none', fontSize: '20px', fontWeight: 'bold'}}
                            onClick = {() => handleOpenGoalModal()}
                            >Create a New Goal</Button>
                            {goalArray}
                            {createGoalModal()}
                            {defineGoalModal()}
                        </div>
                        <img className="leftpage1" src={require('../../components/images/journal/left_page.png')} 
                        alt="First left-side page" />
                        <img className="leftpage2" src={require('../../components/images/journal/left_page2.png')} 
                        alt="Second left-side page"/>
                        <img className="leftpage3" src={require('../../components/images/journal/left_page3.png')} 
                        alt="Third left-side page"/>
                </div>
                <img className="middle-line" src={require('../../components/images/journal/middle_line.png')} alt="Middle journal line"/>
                <div className="rightPageWrapper">
                <img className="bookmark" src={require('../../components/images/journal/bookmark.png')} alt="Yellow bookmark icon"/>
                    <div className="goal-box">
                        <h1 className="journal-title">Recommended Goals</h1>

                                <div className="recommendation-container">
                                    <div className="goal-description">
                                        <img className="eating" src={require('../../components/images/journal/eating_goals.png')} alt="Eating goals icon"/>
                                    </div>

                                    <div className="selection-container">
                                        <h3>Eating + Drinking</h3>
                                        <p>Changing up eating habits can improve your health. See some recommended diet goals here!</p>
                                        <div className="viewGoalButton">
                                            <Button style={{backgroundColor: '#ADF083', width: '45%', textTransform: 'none', fontWeight: 'bold', fontSize: '18px',
                                            borderRadius: '20px'}}
                                            onClick={() => { handleCloseDefineModal(); renderNumericGoal(); addGoal(); }}
                                            >
                                                View Goals
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                                <div className="recommendation-container">

                                    <div className="goal-description">
                                        <img className="activity" src={require('../../components/images/journal/activity_goals.png')} alt="Eating goals icon"/>
                                    </div>

                                    <div className="selection-container">
                                        <h3>Activity</h3>
                                        <p>Getting active and breaking into a sweat will keep your body happy. See some recommended activity goals here!</p>
                                        <div className="viewGoalButton">
                                            <Button style={{backgroundColor: '#ADF083', width: '45%', textTransform: 'none', fontWeight: 'bold', fontSize: '18px',
                                            borderRadius: '20px'}}
                                            onClick={() => { handleCloseDefineModal(); renderNumericGoal(); addGoal(); }}
                                            >
                                                View Goals
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                                <div className="recommendation-container">

                                    <div className="goal-description">
                                        <img className="screentime" src={require('../../components/images/journal/screentime_goals.png')} alt="Eating goals icon"/>
                                    </div>

                                    <div className="selection-container">
                                        <h3>Screentime</h3>
                                        <p>Other habits like balancing your screentime and sleep schedule can also improve your health!</p>
                                        <div className="viewGoalButton">
                                            <Button style={{backgroundColor: '#ADF083', width: '45%', textTransform: 'none', fontWeight: 'bold', fontSize: '18px',
                                            borderRadius: '20px'}}
                                            onClick={() => { handleCloseDefineModal(); renderNumericGoal(); addGoal(); }}
                                            >
                                                View Goals
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                    </div>
                    <img className="rightpage1" src={require('../../components/images/journal/right_page.png')} 
                    alt="First right-side page"/>
                    <img className="rightpage2" src={require('../../components/images/journal/right_page2.png')} 
                    alt="Second right-side page" />
                    <img className="rightpage3" src={require('../../components/images/journal/right_page.png')} 
                    alt="Third right-side page"/>
                </div>
            </div>
        </div>
    );
};

export default JournalScreen;