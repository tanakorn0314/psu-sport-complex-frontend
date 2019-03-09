const demoData = [
    {
      startDate: '2017-06-13T12:41:31.046Z',
      endDate: '2017-06-13T12:41:31.046Z',
    },
    {
      startDate: '2017-06-06T18:22:42.716Z',
      endDate: '2017-06-06T18:22:42.716Z',
    },
    {
      startDate: '2017-06-14T18:53:31.353Z',
      endDate: '2017-06-14T18:53:31.353Z',
    },
    {
      startDate: '2017-06-06T10:50:35.587Z',
      endDate: '2017-06-06T10:50:35.587Z',
    },
    {
      startDate: '2017-06-01T07:26:27.020Z',
      endDate: '2017-06-01T07:26:27.020Z',
    },
    {
      startDate: '2017-06-01T04:19:19.302Z',
      endDate: '2017-06-01T04:19:19.302Z',
    },
    {
      startDate: '2017-06-05T08:21:30.519Z',
      endDate: '2017-06-05T08:21:30.519Z',
    },
    {
      startDate: '2017-06-06T12:33:34.094Z',
      endDate: '2017-06-06T12:33:34.094Z',
    },
    {
      startDate: '2017-06-06T19:08:51.789Z',
      endDate: '2017-06-06T19:08:51.789Z',
    },
    {
      startDate: '2017-06-04T12:53:06.477Z',
      endDate: '2017-06-04T12:53:06.477Z',
    },
    {
      startDate: '2017-05-31T08:13:58.232Z',
      endDate: '2017-05-31T08:13:58.232Z',
    },
    {
      startDate: '2017-05-31T20:49:56.502Z',
      endDate: '2017-05-31T20:49:56.502Z',
    },
    {
      startDate: '2017-05-25T16:37:46.342Z',
      endDate: '2017-05-25T16:37:46.342Z',
    },
    {
      startDate: '2017-05-22T20:55:43.440Z',
      endDate: '2017-05-22T20:55:43.440Z',
    },
    {
      startDate: '2017-06-08T01:26:44.401Z',
      endDate: '2017-06-08T01:26:44.401Z',
    },
    {
      startDate: '2017-06-13T15:13:00.444Z',
      endDate: '2017-06-13T15:13:00.444Z',
    },
    {
      startDate: '2017-06-15T15:07:34.588Z',
      endDate: '2017-06-15T15:07:34.588Z',
    },
    {
      startDate: '2017-06-17T05:51:03.042Z',
      endDate: '2017-06-17T05:51:03.042Z',
    },
    {
      startDate: '2017-06-04T05:44:43.848Z',
      endDate: '2017-06-04T05:44:43.848Z',
    },
    {
      startDate: '2017-05-27T18:52:12.327Z',
      endDate: '2017-05-27T18:52:12.327Z',
    },
    {
      startDate: '2017-06-03T10:56:32.981Z',
      endDate: '2017-06-03T10:56:32.981Z',
    },
    {
      startDate: '2017-06-04T23:39:50.313Z',
      endDate: '2017-06-04T23:39:50.313Z',
    },
    {
      startDate: '2017-06-13T01:47:36.119Z',
      endDate: '2017-06-13T01:47:36.119Z',
    },
    {
      startDate: '2017-06-09T10:53:59.669Z',
      endDate: '2017-06-09T10:53:59.669Z',
    },
    {
      startDate: '2017-06-06T23:37:30.150Z',
      endDate: '2017-06-06T23:37:30.150Z',
    },
    {
      startDate: '2017-05-24T15:47:41.647Z',
      endDate: '2017-05-24T15:47:41.647Z',
    },
    {
      startDate: '2017-05-20T09:37:22.294Z',
      endDate: '2017-05-20T09:37:22.294Z',
    },
    {
      startDate: '2017-05-22T04:18:23.139Z',
      endDate: '2017-05-22T04:18:23.139Z',
    },
    {
      startDate: '2017-05-21T12:52:59.331Z',
      endDate: '2017-05-21T12:52:59.331Z',
    },
    {
      startDate: '2017-06-05T19:12:46.218Z',
      endDate: '2017-06-05T19:12:46.218Z',
    },
    {
      startDate: '2017-06-18T05:42:32.376Z',
      endDate: '2017-06-18T05:42:32.376Z',
    },
    {
      startDate: '2017-06-13T08:25:55.959Z',
      endDate: '2017-06-13T08:25:55.959Z',
    },
    {
      startDate: '2017-06-13T06:24:45.567Z',
      endDate: '2017-06-13T06:24:45.567Z',
    },
    {
      startDate: '2017-06-10T16:02:57.478Z',
      endDate: '2017-06-10T16:02:57.478Z',
    },
    {
      startDate: '2017-06-13T18:05:48.180Z',
      endDate: '2017-06-13T18:05:48.180Z',
    },
    {
      startDate: '2017-06-17T11:41:16.372Z',
      endDate: '2017-06-17T11:41:16.372Z',
    },
    {
      startDate: '2017-05-25T01:29:20.872Z',
      endDate: '2017-05-25T01:29:20.872Z',
    },
    {
      startDate: '2017-06-01T18:23:07.322Z',
      endDate: '2017-06-01T18:23:07.322Z',
    },
    {
      startDate: '2017-05-22T04:20:36.858Z',
      endDate: '2017-05-22T04:20:36.858Z',
    },
    {
      startDate: '2017-05-26T12:05:32.983Z',
      endDate: '2017-05-26T12:05:32.983Z',
    },
    {
      startDate: '2017-06-01T13:57:24.817Z',
      endDate: '2017-06-01T13:57:24.817Z',
    },
    {
      startDate: '2017-05-29T17:58:20.674Z',
      endDate: '2017-05-29T17:58:20.674Z',
    },
    {
      startDate: '2017-06-11T01:19:28.050Z',
      endDate: '2017-06-11T01:19:28.050Z',
    },
    {
      startDate: '2017-05-31T07:10:27.044Z',
      endDate: '2017-05-31T07:10:27.044Z',
    },
    {
      startDate: '2017-05-26T09:00:39.158Z',
      endDate: '2017-05-26T09:00:39.158Z',
    },
    {
      startDate: '2017-05-31T17:15:18.611Z',
      endDate: '2017-05-31T17:15:18.611Z',
    },
    {
      startDate: '2017-06-10T19:42:35.124Z',
      endDate: '2017-06-10T19:42:35.124Z',
    },
    {
      startDate: '2017-05-20T18:40:49.210Z',
      endDate: '2017-05-20T18:40:49.210Z',
    },
    {
      startDate: '2017-06-04T11:36:22.540Z',
      endDate: '2017-06-04T11:36:22.540Z',
    },
    {
      startDate: '2017-06-13T20:53:08.880Z',
      endDate: '2017-06-13T20:53:08.880Z',
    },
  ];

  const exportedDate = demoData.map((event) => {
    const startDate = new Date(2018, 5, 20, 20, 0);
    const endDate = new Date(2018, 5, 20, 20, 30);
    const startSlot = startDate.getHours()*2 - (15 * 2) + (startDate.getMinutes() > 0 ? 1 : 0);
    const endSlot = endDate.getHours()*2 - (15 * 2) + (endDate.getMinutes() > 0 ? 1 : 0);
    event.start = startSlot;
    event.length = endSlot - startSlot;
    return event;
  })

  export default exportedDate;