export declare const SdkAvailabilityStatus: {
    readonly SDK_UNAVAILABLE: 1;
    readonly SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED: 2;
    readonly SDK_AVAILABLE: 3;
};
export declare const TemperatureMeasurementLocation: {
    readonly ARMPIT: 1;
    readonly EAR: 8;
    readonly FINGER: 2;
    readonly FOREHEAD: 3;
    readonly MOUTH: 4;
    readonly RECTUM: 5;
    readonly TEMPORAL_ARTERY: 6;
    readonly TOE: 7;
    readonly UNKNOWN: 0;
    readonly VAGINA: 10;
};
export declare const MealType: {
    readonly BREAKFAST: 1;
    readonly DINNER: 3;
    readonly LUNCH: 2;
    readonly SNACK: 4;
    readonly UNKNOWN: 0;
};
export declare const RelationToMeal: {
    readonly AFTER_MEAL: 4;
    readonly BEFORE_MEAL: 3;
    readonly FASTING: 2;
    readonly GENERAL: 1;
    readonly UNKNOWN: 0;
};
export declare const SpecimenSource: {
    readonly CAPILLARY_BLOOD: 2;
    readonly INTERSTITIAL_FLUID: 1;
    readonly PLASMA: 3;
    readonly SERUM: 4;
    readonly TEARS: 5;
    readonly UNKNOWN: 0;
    readonly WHOLE_BLOOD: 6;
};
export declare const BloodPressureBodyPosition: {
    readonly UNKNOWN: 0;
    readonly STANDING_UP: 1;
    readonly SITTING_DOWN: 2;
    readonly LYING_DOWN: 3;
    readonly RECLINING: 4;
};
export declare const BloodPressureMeasurementLocation: {
    readonly UNKNOWN: 0;
    readonly LEFT_WRIST: 1;
    readonly RIGHT_WRIST: 2;
    readonly LEFT_UPPER_ARM: 3;
    readonly RIGHT_UPPER_ARM: 4;
};
export declare const CervicalMucusAppearance: {
    readonly UNKNOWN: 0;
    readonly DRY: 1;
    readonly STICKY: 2;
    readonly CREAMY: 3;
    readonly WATERY: 4;
    readonly EGG_WHITE: 5;
    readonly APPEARANCE_UNUSUAL: 6;
};
export declare const CervicalMucusSensation: {
    readonly UNKNOWN: 0;
    readonly LIGHT: 1;
    readonly MEDIUM: 2;
    readonly HEAVY: 3;
};
export declare const ExerciseType: {
    readonly OTHER_WORKOUT: 0;
    readonly BACK_EXTENSION: 1;
    readonly BADMINTON: 2;
    readonly BARBELL_SHOULDER_PRESS: 3;
    readonly BASEBALL: 4;
    readonly BASKETBALL: 5;
    readonly BENCH_PRESS: 6;
    readonly BENCH_SIT_UP: 7;
    readonly BIKING: 8;
    readonly BIKING_STATIONARY: 9;
    readonly BOOT_CAMP: 10;
    readonly BOXING: 11;
    readonly BURPEE: 12;
    readonly CALISTHENICS: 13;
    readonly CRICKET: 14;
    readonly CRUNCH: 15;
    readonly DANCING: 16;
    readonly DEADLIFT: 17;
    readonly DUMBBELL_CURL_LEFT_ARM: 18;
    readonly DUMBBELL_CURL_RIGHT_ARM: 19;
    readonly DUMBBELL_FRONT_RAISE: 20;
    readonly DUMBBELL_LATERAL_RAISE: 21;
    readonly DUMBBELL_TRICEPS_EXTENSION_LEFT_ARM: 22;
    readonly DUMBBELL_TRICEPS_EXTENSION_RIGHT_ARM: 23;
    readonly DUMBBELL_TRICEPS_EXTENSION_TWO_ARM: 24;
    readonly ELLIPTICAL: 25;
    readonly EXERCISE_CLASS: 26;
    readonly FENCING: 27;
    readonly FOOTBALL_AMERICAN: 28;
    readonly FOOTBALL_AUSTRALIAN: 29;
    readonly FORWARD_TWIST: 30;
    readonly FRISBEE_DISC: 31;
    readonly GOLF: 32;
    readonly GUIDED_BREATHING: 33;
    readonly GYMNASTICS: 34;
    readonly HANDBALL: 35;
    readonly HIGH_INTENSITY_INTERVAL_TRAINING: 36;
    readonly HIKING: 37;
    readonly ICE_HOCKEY: 38;
    readonly ICE_SKATING: 39;
    readonly JUMPING_JACK: 40;
    readonly JUMP_ROPE: 41;
    readonly LAT_PULL_DOWN: 42;
    readonly LUNGE: 43;
    readonly MARTIAL_ARTS: 44;
    readonly PADDLING: 46;
    readonly PARAGLIDING: 47;
    readonly PILATES: 48;
    readonly PLANK: 49;
    readonly RACQUETBALL: 50;
    readonly ROCK_CLIMBING: 51;
    readonly ROLLER_HOCKEY: 52;
    readonly ROWING: 53;
    readonly ROWING_MACHINE: 54;
    readonly RUGBY: 55;
    readonly RUNNING: 56;
    readonly RUNNING_TREADMILL: 57;
    readonly SAILING: 58;
    readonly SCUBA_DIVING: 59;
    readonly SKATING: 60;
    readonly SKIING: 61;
    readonly SNOWBOARDING: 62;
    readonly SNOWSHOEING: 63;
    readonly SOCCER: 64;
    readonly SOFTBALL: 65;
    readonly SQUASH: 66;
    readonly SQUAT: 67;
    readonly STAIR_CLIMBING: 68;
    readonly STAIR_CLIMBING_MACHINE: 69;
    readonly STRENGTH_TRAINING: 70;
    readonly STRETCHING: 71;
    readonly SURFING: 72;
    readonly SWIMMING_OPEN_WATER: 73;
    readonly SWIMMING_POOL: 74;
    readonly TABLE_TENNIS: 75;
    readonly TENNIS: 76;
    readonly UPPER_TWIST: 77;
    readonly VOLLEYBALL: 78;
    readonly WALKING: 79;
    readonly WATER_POLO: 80;
    readonly WEIGHTLIFTING: 81;
    readonly WHEELCHAIR: 82;
    readonly YOGA: 83;
};
export declare const ProtectionUsed: {
    readonly UNKNOWN: 0;
    readonly PROTECTED: 1;
    readonly UNPROTECTED: 2;
};
export declare const MenstruationFlow: {
    readonly UNKNOWN: 0;
    readonly LIGHT: 1;
    readonly MEDIUM: 2;
    readonly HEAVY: 3;
};
export declare const SleepStageType: {
    readonly UNKNOWN: 0;
    readonly AWAKE: 1;
    readonly SLEEPING: 2;
    readonly OUT_OF_BED: 3;
    readonly LIGHT: 4;
    readonly DEEP: 5;
    readonly REM: 6;
};
export declare const Vo2MaxMeasurementMethod: {
    readonly OTHER: 0;
    readonly METABOLIC_CART: 1;
    readonly HEART_RATE_RATIO: 2;
    readonly COOPER_TEST: 3;
    readonly MULTISTAGE_FITNESS_TEST: 4;
    readonly ROCKPORT_FITNESS_TEST: 5;
};
export declare const OvulationTestResult: {
    /**
     * Inconclusive result. Refers to ovulation test results that are indeterminate (e.g. may be
     * testing malfunction, user error, etc.). ". Any unknown value will also be returned as
     */
    readonly INCONCLUSIVE: 0;
    /**
     * Positive fertility (may also be referred as "peak" fertility). Refers to the peak of the
     * luteinizing hormone (LH) surge and ovulation is expected to occur in 10-36 hours.
     */
    readonly POSITIVE: 1;
    /**
     * High fertility. Refers to a rise in estrogen or luteinizing hormone that may signal the
     * fertile window (time in the menstrual cycle when conception is likely to occur).
     */
    readonly HIGH: 2;
    /**
     * Negative fertility (may also be referred as "low" fertility). Refers to the time in the
     * cycle where fertility/conception is expected to be low.
     */
    readonly NEGATIVE: 3;
};
export declare const ExerciseSegmentType: {
    /** Use this type if the type of the exercise segment is not known. */
    UNKNOWN: number;
    /** Use this type for arm curls. */
    ARM_CURL: number;
    /** Use this type for back extensions. */
    BACK_EXTENSION: number;
    /** Use this type for ball slams. */
    BALL_SLAM: number;
    /** Use this type for barbel shoulder press. */
    BARBELL_SHOULDER_PRESS: number;
    /** Use this type for bench presses. */
    BENCH_PRESS: number;
    /** Use this type for bench sit up. */
    BENCH_SIT_UP: number;
    /** Use this type for biking. */
    BIKING: number;
    /** Use this type for stationary biking. */
    BIKING_STATIONARY: number;
    /** Use this type for burpees. */
    BURPEE: number;
    /** Use this type for crunches. */
    CRUNCH: number;
    /** Use this type for deadlifts. */
    DEADLIFT: number;
    /** Use this type for double arms triceps extensions. */
    DOUBLE_ARM_TRICEPS_EXTENSION: number;
    /** Use this type for left arm dumbbell curl. */
    DUMBBELL_CURL_LEFT_ARM: number;
    DUMBBELL_CURL_RIGHT_ARM: number;
    /** Use this type for right arm dumbbell curl. */
    DUMBBELL_FRONT_RAISE: number;
    /** Use this type for dumbbell lateral raises. */
    DUMBBELL_LATERAL_RAISE: number;
    /** Use this type for dumbbells rows. */
    DUMBBELL_ROW: number;
    /** Use this type for left arm triceps extensions. */
    DUMBBELL_TRICEPS_EXTENSION_LEFT_ARM: number;
    /** Use this type for right arm triceps extensions. */
    DUMBBELL_TRICEPS_EXTENSION_RIGHT_ARM: number;
    /** Use this type for two arms triceps extensions. */
    DUMBBELL_TRICEPS_EXTENSION_TWO_ARM: number;
    /** Use this type for elliptical workout. */
    ELLIPTICAL: number;
    /** Use this type for forward twists. */
    FORWARD_TWIST: number;
    /** Use this type for front raises. */
    FRONT_RAISE: number;
    /** Use this type for high intensity training. */
    HIGH_INTENSITY_INTERVAL_TRAINING: number;
    /** Use this type for hip thrusts. */
    HIP_THRUST: number;
    /** Use this type for hula-hoops. */
    HULA_HOOP: number;
    /** Use this type for jumping jacks. */
    JUMPING_JACK: number;
    /** Use this type for jump rope. */
    JUMP_ROPE: number;
    /** Use this type for kettlebell swings. */
    KETTLEBELL_SWING: number;
    /** Use this type for lateral raises. */
    LATERAL_RAISE: number;
    /** Use this type for lat pull-downs. */
    LAT_PULL_DOWN: number;
    /** Use this type for leg curls. */
    LEG_CURL: number;
    /** Use this type for leg extensions. */
    LEG_EXTENSION: number;
    /** Use this type for leg presses. */
    LEG_PRESS: number;
    /** Use this type for leg raises. */
    LEG_RAISE: number;
    /** Use this type for lunges. */
    LUNGE: number;
    /** Use this type for mountain climber. */
    MOUNTAIN_CLIMBER: number;
    /** Use this type for other workout. */
    OTHER_WORKOUT: number;
    /** Use this type for the pause. */
    PAUSE: number;
    /** Use this type for pilates. */
    PILATES: number;
    /** Use this type for plank. */
    PLANK: number;
    /** Use this type for pull-ups. */
    PULL_UP: number;
    /** Use this type for punches. */
    PUNCH: number;
    /** Use this type for the rest. */
    REST: number;
    /** Use this type for rowing machine workout. */
    ROWING_MACHINE: number;
    /** Use this type for running. */
    RUNNING: number;
    /** Use this type for treadmill running. */
    RUNNING_TREADMILL: number;
    SHOULDER_PRESS: number;
    /** Use this type for shoulder press. */
    SINGLE_ARM_TRICEPS_EXTENSION: number;
    /** Use this type for sit-ups. */
    SIT_UP: number;
    /** Use this type for squats. */
    SQUAT: number;
    /** Use this type for stair climbing. */
    STAIR_CLIMBING: number;
    /** Use this type for stair climbing machine. */
    STAIR_CLIMBING_MACHINE: number;
    /** Use this type for stretching. */
    STRETCHING: number;
    /** Use this type for backstroke swimming. */
    SWIMMING_BACKSTROKE: number;
    /** Use this type for breaststroke swimming. */
    SWIMMING_BREASTSTROKE: number;
    /** Use this type for butterfly swimming. */
    SWIMMING_BUTTERFLY: number;
    SWIMMING_FREESTYLE: number;
    /** Use this type for mixed swimming. */
    SWIMMING_MIXED: number;
    /** Use this type for swimming in open water. */
    SWIMMING_OPEN_WATER: number;
    /** Use this type if other swimming styles are not suitable. */
    SWIMMING_OTHER: number;
    /** Use this type for swimming in the pool. */
    SWIMMING_POOL: number;
    /** Use this type for upper twists. */
    UPPER_TWIST: number;
    /** Use this type for walking. */
    WALKING: number;
    /** Use this type for weightlifting. */
    WEIGHTLIFTING: number;
    /** Use this type for wheelchair. */
    WHEELCHAIR: number;
    /** Use this type for yoga. */
    YOGA: number;
};
export declare const RecordingMethod: {
    /** For actively recorded data by the user. */
    RECORDING_METHOD_ACTIVELY_RECORDED: number;
    /** For passively recorded data by the app. */
    RECORDING_METHOD_AUTOMATICALLY_RECORDED: number;
    /** For manually entered data by the user. */
    RECORDING_METHOD_MANUAL_ENTRY: number;
    /** Unknown recording method. */
    RECORDING_METHOD_UNKNOWN: number;
};
//# sourceMappingURL=constants.d.ts.map