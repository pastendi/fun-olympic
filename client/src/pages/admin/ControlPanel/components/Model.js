import { useAppContext } from '../../../../context/appContext'
import { AddVideo } from './index'

const Model = () => {
  const { inModel, toggleModel } = useAppContext()
  return (
    <div className='admin-model'>
      <div onClick={() => toggleModel()}>
        <i className='fa fa-times close'></i>
      </div>
    </div>
  )
}

export default Model
