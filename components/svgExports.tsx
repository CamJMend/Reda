import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const HandShakeIcon = (props : any) => {
    return <FontAwesome6 name="handshake" {... props} />
};

export const ArrowRightIcon = (props : any) => {
    return <AntDesign name="arrowright" {... props} />
};

export const HandHoldingIcon = (props : any) => {
    return <FontAwesome6 name="hand-holding" {... props} />
};

export const HandUpIcon = (props : any) => {
    return <Entypo name="hand" {... props} />
};

export const LocationIcon = (props : any) => {
    return <MaterialIcons name="location-on" {... props} />
};

export const HomeIcon = (props : any) => {
    return <FontAwesome5 name="home" {... props} />
};

export const AidIcon = (props : any) => {
    return <MaterialIcons name="handshake" {... props} />
};

export const ProfileIcon = (props : any) => {
    return <MaterialIcons name="account-circle" {... props} />
};

export const NotificationsIcon = (props : any) => {
    return <MaterialIcons name="notifications" {... props} />
};

export const EyeIcon = (props : any) => {
    return <FontAwesome {... props} />
};