const customServiceWorkerDev = () => {
    const path = `${process.env.PUBLIC_URL}/customServiceWorker.js`
    navigator.serviceWorker.register(path).then((response) => console.log(`response`, response))
}
export default customServiceWorkerDev