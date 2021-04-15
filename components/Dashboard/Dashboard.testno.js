import { render } from '@testing-library/react-native'
import ReportComponent from './components/ReportComponent'
import { formatDate } from "../../constants/formatDate"

/* test('Dadas dos fechas, regresar un elemento con el texto deseado', () =>{
    const date = new Date()
    const {queryAllByA11yRole} = render(<ReportComponent/>)
    expect(queryAllByA11yRole(`${formatDate(date)} - ${formatDate(date)}`)).toHaveLength(1)
}); */