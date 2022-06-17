import "./App.scss";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import * as React from "react";
interface Player {
  name: string;
  delays: number;
  toPay?: number;
}

interface AppProps {}

interface AppState {
  players: Player[];
  pizzasPrice?: number;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    players: [
      {
        name: "Marcos",
        delays: 0,
        toPay: 0,
      },
      {
        name: "Marco",
        delays: 1,
        toPay: 0,
      },
      {
        name: "Julio",
        delays: 0,
        toPay: 0,
      },
      {
        name: "Alberto",
        delays: 2,
        toPay: 0,
      },
      {
        name: "Omar",
        delays: 3,
        toPay: 0,
      },
      {
        name: "Federico",
        delays: 0,
        toPay: 0,
      },
      {
        name: "Charly",
        delays: 2,
        toPay: 0,
      },
      {
        name: "Ignacio",
        delays: 2,
        toPay: 0,
      },
    ],
    pizzasPrice: 100,
  };

  calculateAmount = (pizzasPrice: number) => {
    const { players } = this.state;
    this.setState({ pizzasPrice });

    const totalDelays = players
      .map((p) => p.delays)
      .reduce((p1: any, p2: any) => {
        console.log("P1 is: ", p1, p2);
        return p1 + p2;
      });

    const unitPrice = pizzasPrice / totalDelays;

    const toPay = players.map((player): Player => {
      player.toPay = player.delays * unitPrice || 0;
      return player;
    }).sort((playerA: any, playerB: any) => playerB.delays - playerA.delays);

    this.setState({ players: toPay });
  };

  componentDidMount(){
    this.calculateAmount(this.state.pizzasPrice);
  }

  render() {
    const { players, pizzasPrice } = this.state;
    return (
      <div className="wrapper">
        <h1>BeGo pizzas</h1>
        <div>
          <div>Pizzas price:</div>
          <input
            value={this.state.pizzasPrice}
            onChange={({ target }: React.SyntheticEvent) =>
              this.calculateAmount(
                parseFloat((target as HTMLInputElement).value)
              )
            }
            type="number"
          />
        </div>
        <div>
          <h2>Participants:</h2>

          {players.map((player) => (
            <div key={player.name} className="player-info">
              <div>
                {player.name}
                <span className="delays">
                  {player.delays} delay{player.delays === 1 ? "" : "s"}
                </span>
              </div>
              <ProgressBar
                percentage={(player.toPay / pizzasPrice) * 100}
                label={`$${player.toPay.toFixed(1) || 0}`}
              ></ProgressBar>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

