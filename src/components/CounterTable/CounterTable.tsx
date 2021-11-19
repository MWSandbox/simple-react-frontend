import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Component } from 'react';
import './CounterTable.css';
import { Add, AddCircleOutline, DeleteOutline, Refresh } from '@mui/icons-material';
import { Counter } from '../../shared/types';
import { counterApiService } from '../../services/CounterAPIService';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

interface CounterState {
  counters: Counter[];
  errorMessage: string;
}

class CounterTable extends Component {

  state: CounterState = {
    counters: [],
    errorMessage: ""
  };

  componentDidMount() {
    this.getCounters();
  }

  getCounters() {
      counterApiService.getAll().then(counters => {
        this.setState({ 
          counters,
          errorMessage: ""
        })
      })
      .catch(error => this.showErrorMessage(error));
  }

  incrementCounter(counterToUpdate: Counter) {
      counterApiService.putIncrement(counterToUpdate)
      .then(incrementedCounter => this.updateIncrementedCounterInState(incrementedCounter))
      .catch(error => this.showErrorMessage(error));
  }

  updateIncrementedCounterInState(incrementedCounter: Counter) {
    this.setState((previousState: CounterState) => {
      let counters = previousState.counters
      let index = counters.indexOf(incrementedCounter);
      counters[index] = incrementedCounter;
      return { 
        counters, 
        errorMessage: ""
      }
    });
  }

  createCounter() {
    counterApiService.post().then(newCounter => this.addNewCounterToState(newCounter))
    .catch(error => this.showErrorMessage(error));
  }

  addNewCounterToState(newCounter: Counter) {
    this.setState((previousState: CounterState) => {
      let counters = previousState.counters;

      if (counters.indexOf(newCounter) < 0) {
        counters.push(newCounter);
      }

      return {
        counters,
        errorMessage: ""
      }
    });
  }

  deleteCounter(counter: Counter) {
    counterApiService.deleteOne(counter.id)
      .then(() => this.removeCounterFromState(counter))
      .catch(error => this.showErrorMessage(error));

  }

  removeCounterFromState(deletedCounter: Counter) {
    this.setState((previousState:CounterState) => {
      let counters = previousState.counters;
      let index = counters.indexOf(deletedCounter);

      if (index >= 0) {
        counters.splice(index, 1);
      }

      return {
        counters,
        errorMessage: ""
      }
    });
  }

  showErrorMessage(error:any) {
    let errorMessage = "Something went wrong :(";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    this.setState({ errorMessage });
  }

  render() {
    return (
      <div>
        <ErrorAlert errorMessage={this.state.errorMessage}/>
        <div id="ActionBar">
          <IconButton onClick={() => this.createCounter()}>
            <Add />
          </IconButton>
          <IconButton onClick={() => this.getCounters()}>
            <Refresh />
          </IconButton>
        </div>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Modify</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.counters.map((counter: Counter) => (
                <TableRow key={counter.id}>
                  <TableCell>{counter.id}</TableCell>
                  <TableCell>{counter.count}</TableCell>
                  <TableCell id="ModifyColumn">
                    <IconButton onClick={() => this.incrementCounter(counter)}>
                      <AddCircleOutline />
                    </IconButton>
                    <IconButton onClick={() => this.deleteCounter(counter)}>
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default CounterTable;
