const Currency = (props) => {
    const value = (props.cash / props.ratio * props.price).toFixed(2);

    return (
        <div>{props.title} {props.cash <= 0 ? '' : value}</div>
    )
}

class ExchangeCounter extends React.Component {
    state = {
        amount: '',
        product: 'electricity',
    }

    static defaultProps = {
        currencies: [
            {
                id: 0,
                name: 'zloty',
                ratio: 1,
                title: 'Value in zlotys: '
            },
            {
                id: 1,
                name: 'dollar',
                ratio: 3.6,
                title: 'Value in dollars: '
            },
            {
                id: 2,
                name: 'euro',
                ratio: 4.2,
                title: 'Value in euros: '
            },
            {
                id: 3,
                name: 'pound',
                ratio: 4.9,
                title: 'Value in pounds: '
            },
        ],
        prices: {
            electricity: .51,
            gas: 4.76,
            oranges: 3.5,
        }
    }

    handleChange = e => {
        this.setState({
            amount: e.target.value,
        })
    }

    handleSelect = e => {
        this.setState({
            product: e.target.value,
            amount: '',
        })
    }

    insertSuffix(select) {
        if (select === 'electricity') return <em>kWH</em>
        else if (select === 'gas') return <em>l</em>
        else if (select === 'oranges') return <em>kg</em>
        else return null;
    }

    selectPrice(select) {
        const price = this.props.prices[select];

        return price;
    }

    render() {
        const { amount, product } = this.state;
        const price = this.selectPrice(product);

        const calculators = this.props.currencies.map(currency => (
            <Currency
                key={currency.id}
                ratio={currency.ratio}
                title={currency.title}
                cash={amount}
                price={price}
            />
        ))

        return (
            <>
                <label>
                    Choose product:
                    <select onChange={this.handleSelect} value={this.state.product}>
                        <option value="electricity">Electicity</option>
                        <option value="gas">Gas</option>
                        <option value="oranges">Oranges</option>
                    </select>
                </label>
                <br />
                <label>
                    Enter amount:
                    <input type="number" value={this.state.amount} onChange={this.handleChange} />
                    {this.insertSuffix(product)}
                </label>
                {calculators}
            </>
        )
    }
}

ReactDOM.render(<ExchangeCounter />, document.getElementById('root'));