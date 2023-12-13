import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Cliente from './Cliente';
import ListaPessoas from './ListaPessoas';

const Stack = createStackNavigator();


export default function StackPessoas() {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="ListaPessoas" component={ListaPessoas} />
                <Stack.Screen name="Cliente" component={Cliente} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}
