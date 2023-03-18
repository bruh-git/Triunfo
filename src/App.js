import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardImage: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardList: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value, checked, type } = target;
    const Value = type === 'checkbox' ? checked : value;
    // [name == nome do componente do formulario, ex quando o nome for == cardName pega o seu valor(value) no caso]
    this.setState({ [name]: Value }, this.validate);
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();// previne o comportamento padrão do botão
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, cardList } = this.state;

    cardList.push({
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    });
    if (cardTrunfo === true) {
      this.setState({ hasTrunfo: true, cardTrunfo: false });
    }

    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
    });
  }

  validate = () => {
    const { cardName, cardImage, cardDescription,
      cardAttr1, cardAttr2, cardAttr3 } = this.state;

    const attrMax = 90;
    const attrsMax3 = 210;
    const soma = parseInt(cardAttr1, 10) + parseInt(cardAttr2, 10)
    + parseInt(cardAttr3, 10);

    if (
      cardName !== ''
      && cardDescription !== ''
      && cardImage !== ''
      && (cardAttr1) <= attrMax
      && (cardAttr2) <= attrMax
      && (cardAttr3) <= attrMax
      && (cardAttr1) >= 0
      && (cardAttr2) >= 0
      && (cardAttr3) >= 0
      && soma <= attrsMax3) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  render() {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, isSaveButtonDisabled, cardList, hasTrunfo } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <main>
          <div className="form-container">
            <Form
              onSaveButtonClick={ this.onSaveButtonClick }
              onInputChange={ this.onInputChange }
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              isSaveButtonDisabled={ isSaveButtonDisabled }
            />
          </div>
          <aside>
            <h2>Preview</h2>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </aside>
          <aside>
            {cardList.map((card) => (
              <Card
                key={ card.cardName }
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
            ))}
          </aside>
        </main>
      </div>
    );
  }
}

export default App;
