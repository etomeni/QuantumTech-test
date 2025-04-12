export const defaultApiResponse = {
    display: false,
    status: false,
    message: ""
}

export const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

export const stringAvatar = (name: string) => {
    // return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;

    const items = name.split(" ");

    let newName = '';
    for (let i = 0; i < items.length; i++) {
        newName = newName + items[i][0];
        if (i > 1) break;
    }
    return newName;
};

export function formatDate(dateString: string | Date): string {
    let date = new Date(dateString);

    if (isNaN(date.getTime())) {
        date = new Date();
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${dayName} ${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}


type base64Interface = {
    display: boolean,
    status: boolean,
    message: string,
    result?: any,
}
export const convertToBase64 = (file: File): Promise<base64Interface> => {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        if (!file) resolve({
            display: false,
            status: false,
            message: ""
        });

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            // resolve(fileReader.result);
            resolve({
                display: false,
                status: true,
                message: "",
                result: fileReader.result
            });
        }

        fileReader.onerror = (_error) => {
            resolve({
                display: true,
                status: false,
                message: "Error loading image."
            });
        }
    });
}