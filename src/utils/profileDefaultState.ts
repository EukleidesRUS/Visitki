export let profileDefaultState = {
    profile: {
      name: "",
      photo: "",
      city: {
        name: "",
        geocode: [] as number[],
      },
      birthday: "",
      quote: "",
      telegram: "",
      github: "",
      template: "",
    },
    info: {
      hobby: {
        text: "",
        image: "" as string | null,
      },
      status: {
        text: "",
        image: "" as string | null,
      },
      job: {
        text: "",
      },
      edu: {
        text: "",
      },
    },
  }