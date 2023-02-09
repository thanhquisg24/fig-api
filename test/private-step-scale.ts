import moment from 'moment';

enum STATUS {
  PENDING = 'P',
  SUCCESS = 'S',
}

interface ReceivedTokenSchedule {
  id: number;
  userId: number;
  receivedDate: Date | string;
  amount: number;
  status: STATUS;
}

function readStepStr(stepString: string) {
  const splitStep = stepString.split('|');
  const [percentStep, firstLockStep, monthStep] = splitStep;
  return {
    percentStep: Number(percentStep),
    firstLockStep: Number(firstLockStep.split('M')[0]),
    monthStep: Number(monthStep.split('M')[0]),
  };
}

function genReceivedTokenScheduleDto(
  userId: number,
  totalAmount: number,
  startDate: string | Date,
  endDate: string | Date,
  stepStr: string,
) {
  console.log('🚀 ~ file: private-step-scale.ts:32 ~ startDate', startDate);
  const _start = moment(startDate);
  //   const _end = moment(endDate);
  //   const startMonths = _start.month() + _start.year() * 12;
  //   const endMonths = _start.month() + _start.year() * 12;
  //   const monthDifference = endMonths - startMonths;
  const stepConfig = readStepStr(stepStr);
  const firstReleaseAmt = totalAmount * (stepConfig.percentStep / 100);
  const firstReleaseRecord: ReceivedTokenSchedule = {
    id: 0,
    userId,
    receivedDate: _start.toDate(),
    amount: firstReleaseAmt,
    status: STATUS.PENDING,
  };
  const result = [firstReleaseRecord];

  const avaiAmt = totalAmount - firstReleaseAmt;
  const firstLockDate = _start.add(stepConfig.firstLockStep, 'M');
  //   console.log(
  //     '🚀 ~ file: private-step-scale.ts:51 ~ firstLockDate',
  //     stepConfig.firstLockStep,
  //     firstLockDate.format('YYYY-MM-DD'),
  //   );
  const normalAmtStep = avaiAmt * (stepConfig.percentStep / 100);
  for (let i = normalAmtStep; i <= avaiAmt; i += normalAmtStep) {
    const dateRelease =
      i === normalAmtStep
        ? firstLockDate
        : firstLockDate.add(stepConfig.monthStep, 'months');
    const amt = normalAmtStep;
    const obj: ReceivedTokenSchedule = {
      id: 0,
      userId,
      //   receivedDate: dateRelease.toDate(),
      receivedDate: dateRelease.format('YYYY-MM-DD'),
      amount: amt,
      status: STATUS.PENDING,
    };
    result.push(obj);
  }

  return result;
}

function main() {
  const step_str = '10|12M|1M';

  const userCreateDto = {
    totalAmount: 1000000,
    startDate: '2022-01-01',
    endDate: '2025-01-01',
  };

  const r = genReceivedTokenScheduleDto(
    1,
    userCreateDto.totalAmount,
    userCreateDto.startDate,
    userCreateDto.endDate,
    step_str,
  );
  console.log('🚀 ~ file: private-step-scale.ts:84 ~  r', r);
}
main();
