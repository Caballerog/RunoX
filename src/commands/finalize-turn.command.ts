import { GameCommand } from "./game.command";
import { GameState } from "../models/game-state.model";

export class FinalizeTurnCommand extends GameCommand {
  execute(state: GameState) {
    if (!state.players.players.length) {
      console.error("No se puede finalizar el turno si no hay jugadores");
    }

    let nextPlayer = null;

    if (!state.turn.player) {
      // es el primer turno, entonces elegimos el primer jugador
      nextPlayer = state.players.players[0];
    } else {
      let currentPlayerIndex = state.players.players.findIndex(
        (player) => player.id === state.turn.player?.id
      );

      currentPlayerIndex++;

      if (currentPlayerIndex !== state.players.players.length) {
        // no ha terminado la vuelta, entonces elegimos el proximo en la lista
        nextPlayer = state.players.players[currentPlayerIndex];
      } else {
        // ya ha jugado el ultimo, entonces comienza nuevamente desde el primero
        nextPlayer = state.players.players[0];
      }
    }

    state.turn.setPlayerTurn(nextPlayer);

    console.log(`Es el turno del jugador: ${state.turn.player?.name}`);
  }
}
