import React, { Component } from 'react';
import { Person } from './Person/Person';

export class App extends Component {
  state = {
    persons: [
      { name: 'simas', age: 25 },
      { name: 'paulius', age: 34 },
    ],
  };
  handler = (): void => {
    this.setState({
      persons: [
        { name: 'simas', age: 20 },
        { name: 'simonas', age: 34 },
      ],
    });
  };
  handlerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      persons: [
        { name: e.target.value, age: 24 },
        { name: 'simonas', age: 34 },
      ],
    });
  };

  render() {
    return (
      <div className="App">
        <p>Hey i am react</p>
        <button onClick={this.handler}>Submit</button>
        <Person props={this.state.persons} changed={this.handlerChange} />
      </div>
    );
  }
}
import React, { FC } from 'react';
import classes from './Person.module.scss';
interface Props {
  name: String;
  age: Number;
}
interface PropsArr {
  props: Props[];
  changed(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const Person: FC<PropsArr> = ({ props, changed }) => {
  return (
    <div className={classes.Divas}>
      {props.map((item) => (
        <p>
          My name {item.name} and age {item.age}
        </p>
      ))}
      <input onChange={changed} type="text" />
    </div>
  );
};
