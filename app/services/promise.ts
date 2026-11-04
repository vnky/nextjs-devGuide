const examplePromise = () => {
    try {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello, world !!!!!!");
            }, 1000);
        });
    }
    catch (error) {
        console.error(error);
        return error;
    }
};

export default examplePromise;