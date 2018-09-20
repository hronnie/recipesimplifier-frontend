export class AppSettings {
    public static RECIPE_BASE_DOMAIN='http://localhost:8080';

    public static INGREDIENT_INFO_URL = AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/ingredientinfo/';
    public static RECIPE_URL = AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/recipe/';
    public static RECIPE_SEARCH_BY_NAME_URL = AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/recipe/byname/';
    public static RECIPE_IMAGE_MANAGEMENT_URL = AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/recipeimage';

    public static HTTP_MSG_422_BAD_DATA_RECIPE = 'Az elküldött recept nem megfelelő';
    public static HTTP_MSG_401_AUTH_ERROR = 'Autentikációs hiba, a recept elküldéséhez be kell jelentkezni';
    public static HTTP_MSG_500_INTERNAL_SERVER_ERROR = 'Rendszerhiba történt, szólj kérlek a rendszergazdának: aron.harsfalvi@gmail.com';
    public static HTTP_MSG_UNKNOWN = 'Ismeretlen hiba';
    public static HTTP_MSG_200_RECIPE_UPDATE = 'A recept sikeresen módosítva lett :) ';
    public static HTTP_MSG_200_RECIPE_DELETE = 'A recept sikeresen törölve lett :) ';
    public static HTTP_MSG_200_RECIPE_CREATE = 'A recept sikeresen el lett tárolva :) ';

}
