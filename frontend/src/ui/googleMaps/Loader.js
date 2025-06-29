// import wheel from './Wheel.gif'
import spinner from './spinner.gif'
import './maps.css'

const Loader = () => {
	return (
		<div className='loader'>
			<img src={spinner} alt='Spinner' />
			<br />
			<h1>Fetching Data...</h1>
		</div>
	)
}

export default Loader
