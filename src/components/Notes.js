import React, { useState, useEffect, Fragment } from 'react';
import Note from './Note';
import axios from 'axios';
const config = require('../config.json');

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      console.log(res);
      setNotes(res.data);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="tile is-ancestor">
                <div className="tile is-parent  is-vertical">
                  {notes && notes.length > 0 ? (
                    notes.map(note => (
                      <Note
                        title={note.notetitle}
                        body={note.notebody}
                        id={note.id}
                        key={note.id}
                      />
                    ))
                  ) : (
                    <div className="tile notification is-warning">
                      No notes available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Notes;

// export default class Products extends Component {
// state = {
// 	newproduct: null,
// 	products: []
// };

// fetchProducts = async () => {
// 	// add call to AWS API Gateway to fetch products here
// 	// then set them in state
// 	try {
// 		const response = await axios.get(`${config.api.invokeUrl}/products`);
// 		this.setState({ products: response.data });
// 	} catch (error) {
// 		console.log(`An error has occurred: ${error}`);
// 	}
// };

// componentDidMount = () => {
// 	this.fetchProducts();
// };

// 	render() {
// 		console.log('inside Products component render');
// 		return (
// 			<Fragment>
// 				<section className='section'>
// 					<div className='container'>
// 						<h1>Energy Products</h1>
// 						<p className='subtitle is-5'>
// 							Invest in a clean future with our efficient and cost-effective green energy products:
// 						</p>
// 						<br />
// 						<div className='columns'>
// 							<div className='column'>
// 								<div className='tile is-ancestor'>
// 									<div className='tile is-4 is-parent  is-vertical'>
// 										{this.state.products && this.state.products.length > 0 ? (
// 											this.state.products.map(product => (
// 												<Product name={product.productname} id={product.id} key={product.id} />
// 											))
// 										) : (
// 											<div className='tile notification is-warning'>No products available</div>
// 										)}
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			</Fragment>
// 		);
// 	}
// }
