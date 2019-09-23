import React from 'react';
import './App.css';

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      error: '',
      currentVal: 0,
      amount: this.normalizeAmount(sessionStorage.getItem('amount')) || 0,
    };
      this.onDonateFormSubmit = this.onDonateFormSubmit.bind(this)
  }

  normalizeAmount(amount) {
    return parseInt(amount || 0)
  }
  onDonateFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = formData.get('amount');
    if (!(amount && this.normalizeAmount(amount))) {
      this.setState({
          error: '*Amount is required',
          currentVal: 0,
      })
    } else if (amount < 0) {
        this.setState({
            error: '*Amount should be more than zero',
            currentVal: 0,
        })
    } else {
        const am = sessionStorage.getItem('amount');
        const final = this.normalizeAmount(am) + this.normalizeAmount(amount);
        if (final <= 100) {
            this.setState({
                error: '',
                amount: final,
                currentVal: this.normalizeAmount(amount)
            });
            sessionStorage.setItem('amount', final);
        } else {
            this.setState({
                error: '*Amount is more than required',
                currentVal: 0,
            });
        }
    }
  }
  render() {
    const { amount } = this.state;
    console.log('amountamountamount', amount);
      return (
          <div className={'wrapper'}>
              <div className={'card'}>
                  {
                      (this.normalizeAmount(amount) === 100)
                      ? <div className={'header'}>Required amount is completed for this project</div>
                      : <div className={'header'}>&#36;{100 - this.normalizeAmount(amount)} still needed for this project</div>
                  }
                  <div className={'progress'}>
                      <div className={'progressBar'} style={{ width: `${this.normalizeAmount(amount)}%` }}></div>
                      <div>
                          <div className={'textWrapper'}>
                              <p>
                                  <b className={'primaryText'}>Only 3 days left</b> to fund this project.
                              </p>
                              <p>
                                  Join the 42 other donors who have already supported this project. Every dollar helps
                              </p>
                              <form onSubmit={this.onDonateFormSubmit}>
                                  <div className={'inputWrapper'}>
                                      <span className="title">&#36;</span>
                                      <input type='number' className={'inputEl'} name="amount" />
                                      {
                                        this.state.error &&
                                            <p className={'errorText'}>{this.state.error}</p>
                                      }
                                      <button className={'submitBtn'}>Give Now</button>
                                      <a className={'link'}>
                                      {
                                        this.state.currentVal > 0 &&
                                        <span>Why give {this.state.currentVal}&#36;</span>
                                      }
                                      </a>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
                  <button className={'shareBtn'}>Save for later</button>&nbsp;&nbsp;&nbsp;
                  <button className={'shareBtn'}>Tell your friends</button>
              </div>
          </div>
      );
  }
}

export default App;
