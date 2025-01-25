import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import IndexScreen from './src/screens/IndexScreen'
import ViewScreen from './src/screens/ViewScreen'
import CreateScreen from './src/screens/CreateScreen'
import EditScreen from './src/screens/EditScreen'
import ProductsScreen from './src/screens/ProductsScreen'
// renaming a generic import to something more specific
import {Provider as DiaryProvider} from './src/context/DiaryContext'
import {BudgetProvider} from './src/context/BudgetContext'

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    View: ViewScreen,
    Create: CreateScreen,
    Edit: EditScreen,
    Products: ProductsScreen
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Shop Wise!',
      headerTitleAlign: 'center',
      headerStyle: {backgroundColor: 'darkgreen',},
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

// make sure our navigator is wrapped in a React component
const App = createAppContainer(navigator)
// now we export our own custom component, App is children within DiaryProvider
export default () => {
  return (
    <DiaryProvider>
    <BudgetProvider>
      <App />
    </BudgetProvider>
    </DiaryProvider>
  )
}
