import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from "react-native-vector-icons"
import PropTypes from 'prop-types'

import mainColor from '../../constants'

const Email = ({ containerStyle, onPressEmail, name, email }) => (
  <TouchableOpacity onPress={() => onPressEmail(email)}>
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
        <MaterialCommunityIcons
          name="email"
          underlayColor="transparent"
          size={30}
          color={mainColor}
          onPress={() => onPressEmail(email)}
        />

      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>{email}</Text>
        </View>
        <View style={styles.emailNameColumn}>
          {name.trim().length !== 0 && (
            <Text style={styles.emailNameText}>{name}</Text>
          )}
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

Email.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  email: PropTypes.string.isRequired,
  name: PropTypes.string,
  onPressEmail: PropTypes.func.isRequired,
}

Email.defaultProps = {
  containerStyle: {},
  name: null,
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
    marginTop: 25

  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
 
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Email
