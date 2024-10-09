// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, SectionList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('WelcomeScreen');
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Boerewors & Chakalaka Sliders', description: 'Mini grilled boerewors patties served with spicy chakalaka relish on freshly baked buns.', price: 50, category: 'Starter' },
    { id: 2, name: 'Braaibroodjies', description: 'Toasted sandwich with tomato, cheese, and onion, grilled on the braai and served with smoky chutney dip', price: 40, category: 'Starter' },
    { id: 3, name: 'Snoek Pâté with Freshly Baked Bread', description: 'Creamy snoek pâté infused with herbs, served with slices of homemade bread.', price: 55, category: 'Starter' },
    { id: 4, name: 'Cape Malay Pickled Fish', description: 'Fresh fish pickled in a sweet and tangy Cape Malay-style curry sauce, served cold.', price: 60, category: 'Starter' },
    { id: 5, name: 'Mogodu (Tripe) with Dumplings', description: 'Traditional tripe cooked until tender, served with steamed dumplings.', price: 65, category: 'Starter' },
    { id: 6, name: 'Vetkoek with Mince Filling', description: 'Golden-brown vetkoek filled with curried mince and a hint of spice.', price: 45, category: 'Starter' },

    { id: 7, name: 'Potjiekos with Samp and Beans', description: 'Hearty potjie stew with slow-cooked beef, vegetables, and aromatic herbs, served with a side of creamy samp and beans.', price: 150, category: 'Main' },
    { id: 8, name: 'Umngqusho with Braised Lamb', description: 'Xhosa-style samp and beans, cooked with butter, and served with tender braised lamb in a rich gravy.', price: 180, category: 'Main' },
    { id: 9, name: 'Traditional Shisa Nyama Platter', description: 'A selection of grilled meats including boerewors, marinated lamb chops, and spicy chicken wings, served with pap, chakalaka, and green salad.', price: 220, category: 'Main' },
    { id: 10, name: 'Oxtail Stew with Dumplings', description: 'Slow-cooked oxtail in a red wine and herb sauce, served with soft, fluffy dumplings.', price: 200, category: 'Main' },
    { id: 11, name: 'Pap & Wors with Sheba Sauce', description: 'A classic combination of creamy pap and grilled boerewors, served with a rich tomato and onion sheba sauce.', price: 160, category: 'Main' },
    { id: 12, name: 'Braai-Spiced Lamb Sosaties with Yellow Rice', description: 'Skewers of marinated lamb, grilled to perfection and served with traditional yellow rice.', price: 180, category: 'Main' },

    { id: 13, name: 'Malva Pudding with Amarula Cream Sauce', description: 'A warm, sweet sponge pudding served with a creamy Amarula sauce.', price: 65, category: 'Dessert' },
    { id: 14, name: 'Jan Ellis Pudding', description: 'Classic South African dessert similar to malva pudding but with a unique caramel flavor, served with ice cream or custard.', price: 55, category: 'Dessert' },
    { id: 15, name: 'Koeksisters (3 pieces)', description: 'Syrup-soaked twisted doughnuts with a crunchy exterior and soft inside.', price: 35, category: 'Dessert' },
    { id: 16, name: 'Milk Tart (per Slice)', description: 'Creamy milk tart with a hint of cinnamon, served with a dusting of powdered sugar.', price: 40, category: 'Dessert' },
    { id: 17, name: 'Peppermint Crisp Tart (per serving)', description: 'Layers of tennis biscuits, caramel, and peppermint crisp, topped with whipped cream.', price: 50, category: 'Dessert' },
    { id: 18, name: 'Traditional Malva & Melktert Duo', description: 'A serving of both malva pudding and melktert for those who want to enjoy a bit of everything.', price: 75, category: 'Dessert' },

    { id: 19, name: 'Homemade Ginger Beer', description: 'A refreshing, slightly spicy ginger beer made from scratch, served over ice with a slice of lemon.', price: 35, category: 'Beverage' },
    { id: 20, name: 'Rooibos Iced Tea', description: 'Brewed rooibos tea, served chilled with a touch of honey and fresh mint.', price: 30, category: 'Beverage' },
    { id: 21, name: 'Mango Lassi with a Twist', description: 'A creamy yogurt-based drink with fresh mango, cardamom, and a hint of rosewater for a refreshing tropical experience.', price: 40, category: 'Beverage' },
    { id: 22, name: 'Amasi Smoothie', description: 'A nutritious drink made from amasi (fermented milk) blended with banana and honey for a tangy, creamy treat.', price: 45, category: 'Beverage' },
    { id: 23, name: 'Sorrel & Hibiscus Cooler', description: 'A zesty sorrel and hibiscus-infused cooler with hints of lime and ginger.', price: 35, category: 'Beverage' },
    { id: 24, name: 'Umqombothi Non-Alcoholic Brew', description: 'A traditional African non-alcoholic beer made from maize and sorghum, served chilled.', price: 50, category: 'Beverage' },
  ]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', category: 'Starter' });

  // Function to group items by category
  const groupedMenuItems = menuItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  const sections = Object.keys(groupedMenuItems).map((category) => ({
    title: category,
    data: groupedMenuItems[category],
  }));

  // Function to render different screens
  const renderScreen = () => {
    switch (currentScreen) {
      case 'WelcomeScreen':
        return <WelcomeScreen navigate={setCurrentScreen} />;
      case 'MenuScreen':
        return <MenuScreen sections={sections} navigate={setCurrentScreen} />;
      case 'AddMenuItemScreen':
        return (
          <AddMenuItemScreen
            newMenuItem={newMenuItem}
            setNewMenuItem={setNewMenuItem}
            addMenuItem={(item) => {
              setMenuItems([...menuItems, { ...item, id: menuItems.length + 1 }]);
              setCurrentScreen('MenuScreen');
            }}
          />
        );
      default:
        return <WelcomeScreen navigate={setCurrentScreen} />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const WelcomeScreen = ({ navigate }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Welcome to Heritage Harvest</Text>
    <Button title="Proceed to Menu" onPress={() => navigate('MenuScreen')} />
  </View>
);

const MenuScreen = ({ sections, navigate }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Menu</Text>
    <SectionList
      sections={sections}
      renderItem={({ item }) => (
        <View style={styles.menuItem}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemPrice}>R {item.price}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
    <Button title="Add New Menu Item" onPress={() => navigate('AddMenuItemScreen')} />
  </View>
);

const AddMenuItemScreen = ({ newMenuItem, setNewMenuItem, addMenuItem }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Add New Menu Item</Text>
    <TextInput
      placeholder="Name"
      value={newMenuItem.name}
      onChangeText={(text) => setNewMenuItem({ ...newMenuItem, name: text })}
      style={styles.input}
    />
    <TextInput
      placeholder="Price"
      value={newMenuItem.price}
      onChangeText={(text) => setNewMenuItem({ ...newMenuItem, price: text })}
      style={styles.input}
      keyboardType="numeric"
    />
    <Text>Category</Text>
    <Picker
      selectedValue={newMenuItem.category}
      onValueChange={(itemValue) => setNewMenuItem({ ...newMenuItem, category: itemValue })}
      style={styles.picker}
    >
      <Picker.Item label="Starter" value="Starter" />
      <Picker.Item label="Main" value="Main" />
      <Picker.Item label="Dessert" value="Dessert" />
      <Picker.Item label="Beverage" value="Beverage" />
    </Picker>
    <Button title="Add Item" onPress={() => addMenuItem(newMenuItem)} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    padding: 5,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    height: 50,
    marginBottom: 20,
  },
});

export default App;
